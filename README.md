# Deployment Milestone

## Team Members

| Name | Unity ID |
| --- | --- |
| Rishi Jain | rjain9 |
| Omkar Acharya | oachary |
| Shriyansh Yadav | scyadav |
| Urmil Parikh | uparikh |

## Screencast

### [Checkbox Deployment, Canary Release, Redis Feature Flag](https://youtu.be/CCGi_iMIrP8)  

[<img src="https://img.youtube.com/vi/CCGi_iMIrP8/0.jpg" href="Click to Watch" title="Click to Watch" height="200" width="350">](https://youtu.be/CCGi_iMIrP8)

### [iTrust Deployment, Rolling Update](https://youtu.be/taxZHjd4NmY) 

[<img src="https://img.youtube.com/vi/taxZHjd4NmY/0.jpg" href="Click to Watch" title="Click to Watch" height="200" width="350">](https://youtu.be/taxZHjd4NmY)

### [Kubernetes Cluster](https://youtu.be/E8VysVK6rA0)

[<img src="https://img.youtube.com/vi/E8VysVK6rA0/0.jpg" href="Click to Watch" title="Click to Watch" height="200" width="350">](https://youtu.be/E8VysVK6rA0)

## Instructions for Execution

#### Environment Variables

* Add the following environment variables in `/etc/environment` file before running ansible scripts (Sometimes `sudo` can't access these variables if you put them in `~/.bashrc` or use `export` from terminal)  
```
 1. GITHUB_NAME="First Last"
 2. GITHUB_EMAIL=<unityid>@ncsu.edu
 3. GITHUB_USERNAME=<unityid>
 4. GITHUB_PASSWORD=<password>
 5. MAIL_FROM=<gmail username>
 6. MAIL_USER=<gmail username>
 7. MAIL_PASSWORD=<gmail password>
 8. MAIL_SMTP=smtp.gmail.com
 9. MONGO_USER=<mongo_user>
10. MONGO_PASSWORD=<mongo_password>
11. MONGO_IP=localhost
12. MONGO_PORT=3002
13. AWS_REGION=<aws region>
14. AWS_ACCESS_KEY=<aws access key>
15. AWS_SECRET_KEY=<aws secret token>
```

#### For everything except Kubernetes
* Run [provision-jenkins](src/provision-jenkins.yml) using `ansible-playbook -i inventory provision-jenkins.yml`

#### For Kubernetes
* Run [provision-kubernetes](src/provision-kubernetes.yml) using `ansible-playbook provision-kubernetes.yml`

#### GitHub Repositories: [iTrust2](https://github.ncsu.edu/oachary/iTrust2-v2/tree/production) | [checkbox.io](https://github.com/rjain9/checkbox.io/tree/production)
* We are using our forked repositories as we are making changes to demonstrate the deployment stratagies

## AWS-EC2 Instances

* We created 7 AWS-EC2 instances for Deployment, Redis Feature Flag, Canary Release and Rolling Updates.

  | Instance No. |  Role |
  | --- | --- |
  | 1 | Jenkins Server, Redis master, Loadbalancer(proxy for checkbox.io), Monitoring of Rolling update (Heartbeat) |
  | 2 | MySQL,server, MongoDB server |
  | 3 | iTrust server, Checkbox.io server |
  | 4 | iTrust server, Checkbox.io server |
  | 5 | iTrust server |
  | 6 | iTrust server |
  | 7 | iTrust server |

* We created 4 other AWS-EC2 instances for Kubernetes Cluster

  | Instance No. |  Role |
  | --- | --- |
  | 1 | Master |
  | 2 | Node |
  | 3 | Node |
  | 4 | Node |

## Deployment

### Checkbox.io Deployment

<img src="img/checkboxioDeployment.png">

### iTrust Deployment

<img src="img/iTrustDeployment.png">

## Infrastructure Upgrade

### Kubernetes
* A dockerized version of `checkbox.io` is created [here](https://hub.docker.com/r/oachary/checkbox/) using [Dockerfile](src/Dockerfile)
* Kubernetes cluster with one `Master` and three `Nodes` is created on AWS using EC2 instances
* Kubernetes uses the same dockerized version to create the cluster

### Redis Feature Flag
For this part we configured a redis server by running redis on a remote instance. We can then use the ip of the server and the configured port to access the redis server. For checkbox.io, a feature flag is implemented for create study. The study cannot be created if the value of the flag is false. Otherwise it will create the study. The value of the flag is set to be accessed from the redis server. So whenever the value of the key corresponding to the flag is changed to false, the feature is turned off, but when its true, the feature can be used. To toggle the redis feature flag
  
To manually see the working of the `redis app` which provides status as well as toggles the redis flag, you can follow the following steps: 

* ssh into jenkins server
```
ssh -i ~/.ssh/jenkins.key ubuntu@<jenkins ip>
```
* Go to the directory where redis.js is present 
```
cd /home/ubuntu/CSC519DevOps-Project/src/redis
```
* If npm modules are not already present from the script, use
```
npm install
```
* Run
```
node redis.js
```
* This will run the script on `<jenkins_ip>:5000`
* To get the status of the feature flag, visit `<jenkins_ip>:5000/featureFlagStatus`
* To toggle the feature flag, visit `<jenkins_ip>:5000/featureFlagToggle`

## Canary Release
We implemented canary releasing by using a load balancer which balances traffic between servers. When an alert is raised (when the canary server is down), all the traffic is redirected to the stable production server. The diagramatic representation of the same is as follows:

<img src="img/Canary1.png">

<img src="img/Canary2.png">

To manually see the working of the loadbalancer which redirects traffic to stable production and canary server you can just follow the following steps: 

* ssh into jenkins server
```
ssh -i ~/.ssh/jenkins.key ubuntu@<jenkins_ip>
```
* Go to the directory where loadbalancer.js is present 
```
cd /home/ubuntu/CSC519DevOps-Project/src/roles/loadbalancer/files
```
* If npm modules are not already present from the script, use
```
npm install
```
* Run
```
node loadbalancer.js
```

## Rolling Updates
For this part, we created 5 EC2 instances as the production servers for iTrust and 1 EC2 instance as the central MySQL server for all of them. Using Rolling Update deployment strategy, whenever any new code is pushed to the remote repository, all the servers are redeployed one by one. This can be demonstrated as follows:
<img src="img/rollingUpdate.png">

#### Heartbeat Mechanism:
* We are using `nodejs` script to implement this mechanism. Using this, the script continuously shows the status of all the 5 itrust instances. Screencast of this part demonstrates this.
* To manually see the working of the heartbeat mechanism, you can follow the following steps:
  * SSH into jenkins server
  ```bash
  ssh -i ~/.ssh/jenkins.key ubuntu@<jenkins_ip>
  ```
  * Go to the directory where dashboard.js is present 
  ```bash
  cd /home/ubuntu/CSC519DevOps-Project/src/itrust-dashboard
  ```
  * If npm modules are not already present from the script, use
  ```bash
  npm install
  ```
  * Run
  ```bash
  node dashboard.js
  ```

## Individual Contribution:
**Omkar Acharya (oachary):**
* Provisioning `jenkins`, `itrust`, `checkbox.io`, `MySQL`, and `MongoDB`
* **Part 1A** - `iTrust` deployment
* **Part 2A** - `Kubernetes` clusters
* **Part 2B** - `Redis feature flag` app using express
* **Part 4** - `iTrust` rolling updates

**Rishi Jain (rjain9):**
* **Part 1B** - `checkbox.io` deployment.
* **Part 3** - `checkbox.io` Canary Release.
* **Part 4** - `iTrust` rolling updates monitoring.

**Shriyansh Yadav (scyadav):**
* Worked on deployment of checkbox.io initially.
* Created the ansible roles for redis server and redis client. 

**Urmil Parikh (uparikh):**
* Wrote script for creating redis server.
* Implemented feature flag in checkbox.io.
