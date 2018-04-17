# Deployment


## Team Members

| Name | Unity Id |
| --- | --- |
| Rishi Jain | rjain9 |
| Omkar Acharya | oachary |
| Shriyansh Yadav | scyadav |
| Urmil Parikh | uparikh |

## Screencast:  

### [Checkbox Deployment and Canary Release]()  
### [iTrust Deployment and Rolling Update]() 
### [Kubernetes Cluster]()
### [Redis Feature Flag]()

## AWS-EC2 Instances:

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

* We  created 4 other AWS-EC2 instances for Kubernetes Cluster

  | Instance No. |  Role |
  | --- | --- |
  | 1 | Master |
  | 2 | Node |
  | 3 | Node |
  | 4 | Node |

## Deployment

### Checkbox.io Deployment

### iTrust Deployment

<img src="https://github.ncsu.edu/rjain9/CSC519DevOps-Project/blob/Deployment/images/iTrustDeployment.png">

## Infrastructure Upgrade


## Canary Release
We implemented canary releasing by using a load balancer which balances traffic between servers. When an alert is raised (when the canary server is down), all the traffic is redirected to the stable production server. The diagramatic representation of the same is as follows:

<img src="https://github.ncsu.edu/rjain9/CSC519DevOps-Project/blob/Deployment/images/Canary1.png">

<img src="https://github.ncsu.edu/rjain9/CSC519DevOps-Project/blob/Deployment/images/Canary2.png">

## Rolling Update

<img src="https://github.ncsu.edu/rjain9/CSC519DevOps-Project/blob/Deployment/images/rollingUpdate.png">
