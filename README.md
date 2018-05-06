# CSC 519 DevOps: Special Milestone

## Team Members

| Name | Unity ID |
| --- | --- |
| Rishi Jain | rjain9 |
| Omkar Acharya | oachary |
| Shriyansh Yadav | scyadav |
| Urmil Parikh | uparikh |

## Doctor Monkey

### Screencast: [Link](https://youtu.be/-205G86rt9U)

### Concept

* As [Netflix](https://medium.com/netflix-techblog/the-netflix-simian-army-16e57fbab116) describes, `Doctor Monkey` taps into health checks that run on each instance as well as monitors other external signs of health (e.g. CPU load) to detect unhealthy instances. Once unhealthy instances are detected, they are removed from service and after giving the service owners time to root-cause the problem, are eventually terminated.

* We have implemented `Doctor Monkey` which stops forwarding the requests from the `proxy server` to that `checkbox.io` server whose `CPU Usage` exceeds the threshold. For the demo purpose, we have set the threshold of only **10%**. In the real scenario, this should be set to a high value.

### Implementation

* We extended the same code base from the previous [Deployment](https://github.ncsu.edu/rjain9/CSC519DevOps-Project/tree/Deployment) milestone. 

* First, follow instruction from Deployment Milestone's [README](https://github.ncsu.edu/rjain9/CSC519DevOps-Project/tree/Deployment/README.md). **Make sure that both checkbox.io servers are up and running before running the proxy server.** 

* You may want to change the checkbox server IPs in [checkbox-servers](doctor-monkey/checkbox-servers). We used the same `Jenkins` server from the previous milestone as our proxy server. So, you may also want to modify [this](doctor-monkey/server.js#L22) IP address and put the `Jenkins` server IP address. Make sure that this same [server.js](doctor-monkey/server.js) file with the updated IP is present on the two checkbox servers. If not, stop the current servers and reboot them with the updated server file. 

* Next, run the proxy server,
```bash
$ npm install
$ node server.js
```

* We modified `checkbox.io` server script to add an endpoint `/cpu`, which returns the percent cpu usage. The modified version of checkbox.io is available [here](https://github.com/rjain9/checkbox.io/tree/special/server-side/site).

* Our [proxy](doctor-monkey/proxy.js) continuously checks for cpu usage for all the servers and doctor monkey stops forwarding the requests to that server.

* Below is the screenshot of the proxy server's output. Until the threshold was not exceeded, it was toggling between the two checkbox servers. As soon as the threshold was exceeded by one of the servers, the proxy server stopped forwarding the requests to that server.

* **Proxy Server Console Output:**
  
  ![Proxy Server with Doctor Monkey](img/Doctor_Monkey.PNG)

### References
* [Medium.com](https://medium.com/netflix-techblog/the-netflix-simian-army-16e57fbab116)
* [TechTarget](https://whatis.techtarget.com/definition/Simian-Army)
* [Wired](https://www.wired.com/2014/07/security-monkey/)


## Individual Contribution:
**Omkar Acharya (oachary):**
* `Doctor Monkey` setup and implementation
* `Checkbox.io` proxy server implementation
* Screencast and README for the above

**Rishi Jain (rjain9):**

**Shriyansh Yadav (scyadav):**

**Urmil Parikh (uparikh):**
