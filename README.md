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
