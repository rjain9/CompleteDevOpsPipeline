"""

Filename: run_fuzzer.py
Description: This file contains the fuzzer and test prioritization tasks for Milestone 2

"""

# Imports
import os, operator, jenkins, time, requests
from shutil import copyfile
from fuzzer import fuzz
import xml.etree.ElementTree as ET

# Directory paths
HOME_DIR = "/home/vagrant"
CURR_DIR = "{path}/CSC519DevOps-Project/jenkins/roles/itrust/files".format(path = HOME_DIR)
WORKSPACE = "{path}/workspace".format(path = HOME_DIR)
HOME_ITRUST = "{path}/iTrust2-v2/iTrust2".format(path = HOME_DIR)
FUZZER_PATH = "{path}/src/main/java/edu/ncsu/csc/itrust2".format(path = HOME_ITRUST)
ITERATIONS = 100

# Environment variables
GIT_NAME = os.environ.get("GITHUB_NAME")
GIT_EMAIL = os.environ.get("GITHUB_EMAIL")
GIT_USERNAME = os.environ.get("GITHUB_USERNAME")
GIT_PASSWORD = os.environ.get("GITHUB_PASSWORD")
MAIL_FROM = os.environ.get("MAIL_FROM")
MAIL_USER = os.environ.get("MAIL_USER")
MAIL_PASSWORD = os.environ.get("MAIL_PASSWORD")
MAIL_SMTP = os.environ.get("MAIL_SMTP")

# Jenkins variables
JENKINS_PORT = 9090
JENKINS_HOSTNAME = "localhost"
JENKINS_URL = "http://{jenkins_hostname}:{jenkins_port}".format(jenkins_port = JENKINS_PORT, jenkins_hostname = JENKINS_HOSTNAME)
JENKINS_CLI_JAR = "/opt/jenkins-cli.jar"
JENKINS_JOB = "itrust"

# Jenkins server object
jenkins_server = jenkins.Jenkins(JENKINS_URL)

# Dictionary containing {test_name:test_object}
tests = dict()
# List for storing successful build numbers (to filter stopped builds due to timeout)
successful_builds = list()


class Test:
    """
    This class represents a test case for iTrust
    """

    def __init__(self, name):
        """
        Constructor for Test class
        :param name: Test case name
        """
        self.name = name
        # Sum of test cases duration for ITERATIONS
        self.duration = 0
        # Number of times this test case fails
        self.fail_count = 0

    def __repr__(self):
        """
        This method is used for representing Test class object
        """
        return "\nTest Name: {name}, Test Duration: {duration}, Test Fail Count: {fail_count}"\
        .format(name = self.name, duration = self.duration, fail_count = self.fail_count)

    def __lt__(self, other):
        """
        This method is used for sorting Test class objects
        :param other: Second object with which the first one is to be compared
        """
        if self.fail_count < other.fail_count:
            return True
        elif self.fail_count > other.fail_count:
            return False
        else:
            if self.duration <= other.duration:
                return True
            return False

    def get_name(self):
        """
        This is a getter function for test name
        """
        return self.name

    def get_duration(self):
        """
        This is a getter function for test duration
        """
        return self.duration

    def get_fail_count(self):
        """
        This is a getter function for test failure count
        """
        return self.fail_count

    def increase_fail_count(self):
        """
        This function increases the failure count by one if the test case fails
        """
        self.fail_count = self.fail_count + 1

    @staticmethod
    def prioritize():
        """
        This is a static method which generates the prioritization report in .txt format
        """
        with open("{path}/test_priority.txt".format(path = HOME_DIR), "w") as f:
            for test in (sorted(tests.values(), reverse = True)):
                print(test)
                f.write(test.__repr__())


# Git helper methods

def git_clone(repo, path):
    """
    This method is equivalent to `git clone <url>`
    :param path: Path of .git directory
    :param repo: Remote address of the repository
    """
    os.system("cd {path} && git clone {repo}".format(repo = repo, path = path))


def git_checkout(branch, path):
    """
    This method is equivalent to `git checkout <branch>`
    :param path: Path of .git directory
    :param branch: Name of the branch to be checked out
    """
    os.system("cd {path} && git checkout {branch}".format(branch = branch, path = path))


def git_pull(path):
    """
    This method is equivalent to `git pull`
    :param path: Path of .git directory
    """
    os.system("cd {path} && git pull".format(path = path))


def git_reset(commit_hash, path):
    """
    This method is equivalent to `git reset --hard <commit_hash>`
    :param commit_hash: String containing commit hash of the commit to be reset tos
    :param path: Path of .git directory
    """
    os.system("cd {path} && git reset --hard {commit_hash}".format(commit_hash = commit_hash, path = path))


def git_revert(path):
    """
    This method is equivalent to `git revert --no-edit <commit_hash>`
    :param path: Path of .git directory
    """
    os.system("cd {path} && git revert --no-edit HEAD".format(path = path))
    git_push(path)


def git_commit(message, path):
    """
    This method is equivalent to `git commit -m <message>`s
    :param message: String containing commit message
    :param path: Path of .git directory
    """
    return os.popen("cd {path} && git add . && git commit -m {message}".format(message = message, path = path)).read()


def git_push(path):
    """
    This method is equivalent to `git push`
    :param path: Path of .git directory
    """
    os.system("cd {path} && git push".format(path = path))


def git_get_commit_hash(branch, path):
    """
    This method returns the commit hash of the last commit
    :param branch: String containing branch to be checked for the last commit
    :param path: Path of .git directory
    """
    return os.popen("cd {path} && git rev-parse {branch}".format(branch = branch, path = path)).read()


def git_set_credentials(path):
    """
    This method sets the git credentials for the given .git directory
    :param path: Path of .git directory
    """
    os.system("cd {path} && git config --global user.name {username}".format(username = GIT_NAME, path = path))
    os.system("cd {path} && git config --global user.email {email}".format(email = GIT_EMAIL, path = path))


def compile(path):
    """
    This method checks whether the current code base compiles successfully
    :param path: Path of directory where pom.xml is stored
    """
    return os.popen("cd {path} && mvn compile".format(path = path)).read()


def prioritize_tests():
    """
    This function parses the XML reports generated by JUnit plugin of Jenkins and prioritizes the tests accordingly
    """
    # Iterate over all successful builds
    for build_no in successful_builds:
        # Parse the XML report
        report = "/var/lib/jenkins/jobs/itrust/builds/{build}/junitResult.xml".format(build = build_no)
        tree = ET.parse(report)
        root = tree.getroot()

        # Iterate over all the test cases
        for test_case in root.iter('case'):
            # Extract test case attributes
            test_name = test_case.find('testName').text
            test_duration = float(test_case.find('duration').text)
            test_error_stack_trace = test_case.find('errorStackTrace')
            test_failed = False
            # Check if the test case fails or not
            if isinstance(test_error_stack_trace, ET.Element):
                test_failed = True
            # Create Test class object if doesn't exist
            if test_name not in tests:
                tests[test_name] = Test(test_name)
            # Add current test duration
            tests[test_name].duration += test_duration
            # Increment the failure count for the current test if fails
            if test_failed:
                tests[test_name].increase_fail_count()

    # Generate the prioritization report
    Test.prioritize()


def build_job(build_no):
    """
    This function starts a new build in jenkins
    :param build_no: Integer value for the current build number
    """
    # Start a new build of Jenkins job
    jenkins_server.build_job(JENKINS_JOB)
    # JUnit XML report path
    report = "/var/lib/jenkins/jobs/itrust/builds/{build}/junitResult.xml".format(build = build_no + 1)
    # Build timeout
    timeout = 5
    build_timeout = time.time() + 60 * timeout
    # Wait till the JUnit report is generated for timeout
    while time.time() < build_timeout:
        if os.path.exists(report):
            return True
    # If timed out, return False
    return False


def prepare_job():
    """
    This function performs all the preprocessing steps for the Jenkins job
    """
    # Jenkins paths
    jenkins_workspace = "{path}/{job_name}".format(path = WORKSPACE, job_name = JENKINS_JOB)
    jenkins_itrust = jenkins_workspace + "/iTrust2-v2/iTrust2"
    # If workspace directory doesn't exist, create it (For the first build only)
    if not os.path.isdir(WORKSPACE):
        os.system("mkdir {path}".format(path = WORKSPACE))
        os.system("mkdir {path}".format(path = jenkins_workspace))
    # Remove the old repository
    os.system("rm -rf {path}/iTrust2-v2".format(path = jenkins_workspace))
    # Clone the new repository
    git_clone("https://{username}:{password}@github.ncsu.edu/oachary/iTrust2-v2.git".format(username = GIT_USERNAME, password = GIT_PASSWORD), jenkins_workspace)
    # Checkout to fuzzer branch
    git_checkout("fuzzer", jenkins_itrust)
    # Create email.properties file
    os.system("printf \"from {mail_from}\nusername {user}\npassword {password}\nhost {smtp}\n\" > {path}/src/main/java/email.properties"\
    .format(path = jenkins_itrust, mail_from = MAIL_FROM, user = MAIL_USER, password = MAIL_PASSWORD, smtp = MAIL_SMTP))
    # Copy pom-data.xml file
    os.system("cp {src}/pom-data.xml {dest}/pom-data.xml".format(src = CURR_DIR, dest = jenkins_itrust))


def main():
    """
    This is the main function
    """
    # Set GitHub credentials for itrust repository
    print("Setting GitHub credentials")
    git_set_credentials(HOME_ITRUST)
    # Build counter
    iteration = 0

    # Iterate for 100 successful bulds
    while len(successful_builds) < ITERATIONS:
        print("Starting the iteration {}".format(iteration + 1))
        # Checkout to fuzzer branch
        print("Checking out to fuzzer branch")
        git_checkout("fuzzer", HOME_ITRUST)
        # Pull the latest code
        print("Pulling the latest code")
        git_pull(HOME_ITRUST)
        # Call fuzzer
        print("Fuzzing the files")
        fuzz(FUZZER_PATH)
        # Check if the code compiles after fuzzing
        print("Compiling the code")
        compile_log = compile(HOME_ITRUST)
        print(compile_log)
        # If the code compiles
        if "BUILD FAILURE" not in compile_log:
            # Commit the code
            print("Commiting fuzzer changes")
            commit_status = git_commit("\"Fuzzer Iteration {}\"".format(iteration + 1), HOME_ITRUST)
            print(commit_status)
            # If fuzzer manages to change any file
            if "nothing to commit, working directory clean" not in commit_status:
                print("Pushing the commits")
                git_push(HOME_ITRUST)
            else:
                print("Fuzzer didn't change anything, skipping")
                continue

            # Perform preprocessing steps
            print("Preparing for a new build")
            prepare_job()
            # Start a new build
            print("Starting a new build")
            is_complete = build_job(iteration)
            # If the build is complete
            if is_complete:
                print("New build is successful")
                successful_builds.append(iteration + 1)
            else:
                print("New build is timed out and hence stopped")
            # Increment the iteration counter
            iteration += 1
            # Revert the last commit of fuzzing
            print("Reverting the commit")
            git_revert(HOME_ITRUST)

        else:
            # Reset the repository if the build fails
            print("Compilation error, local build failed")
            git_reset("HEAD", HOME_ITRUST)

    # Call test prioritizer
    print("Prioritizing the tests")
    prioritize_tests()


# Entry point of the program
if __name__ == "__main__":
    main()