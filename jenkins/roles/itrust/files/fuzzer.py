"""

Filename: fuzzer.py
Description: This file contains the fuzzer and test prioritization tasks for Milestone 2

"""

# Imports
import random, string, re, os


def get_files(path, extension):
    """
    This function lists all the files which are to be fuzzed
    :param path: Path of the code base
    :param extension: String containing valid extension of the files
    """
    return [os.path.join(dir_path, filename) for dir_path, _, filenames in os.walk(path) for filename in filenames if os.path.splitext(filename)[1] == extension and "models" not in dir_path]


def is_condition(line):
    """
    This condition checks if the current line is a loop/conditional statement
    """
    for loop in ["if", "while", "do"]:
        if loop in line:
            return True
    return False


def mutate(java_files):
    """
    This function contains the logic for fuzzer
    :param java_files: List containing paths of the files to be fuzzed
    """
    # Shuffle the files
    random.shuffle(java_files)

    # Iterate over all the files
    for i, java_file in enumerate(java_files):
        # Create a random string
        rand_str = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(7))
        # Read the current file content
        with open(java_file, "r") as f:
            content = f.readlines()

        # New content after fuzzing
        new_content = []
        # Iterate over each line
        for line in content:
            # Generate a random number for the probability
            rand_int = random.random()
            
            # Swap < with > and vice versa
            if rand_int < 0.2:
                if is_condition(line):
                    line = re.sub(r">=", "<", line)
            elif rand_int > 0.8:
                if is_condition(line):
                    line = re.sub(r"<=", ">", line)

            # Swap == with != and vice versa
            if rand_int < 0.2:
                if is_condition(line):
                    line = re.sub(r"==", "!=", line)
            elif rand_int > 0.8:
                if is_condition(line):
                    line = re.sub(r"!=", "==", line)

            # # Swap 0 with 1 and vice versa
            # if rand_int < 0.5:
            #     line = re.sub(r"\b0\b", "1", line)
            # elif rand_int > 0.5:
            #     line = re.sub(r"\b1\b", "0", line)

            # Modify string content
            if rand_int < 0.2 and "/" not in line:
                matches = re.findall(r'\"(.+?)\"', line)
                for match in matches:
                    line = line.replace('"' + match + '"', '"' + rand_str + '"')

            # Add the line to the new content
            new_content.append(line)

        # Write the new content to the file
        with open(java_file, "w") as f:
            f.write("".join(new_content))


def fuzz(path):
    """
    This function calls fuzzer
    :param path: Path of the code base
    """
    # Get a list of files to be fuzzed
    files = get_files(path, ".java")
    # Call the fuzzer
    mutate(files)