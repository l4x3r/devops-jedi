## Setup Azure Devops Server Agent in Kubernetes

### Lab environment
Azure DevOps Server: https://tfstest/tfs/

K8s cluster: https://api.scbclu01.scbeval.net:6443 (Openshift)

### Create organization for Agent Pool
Go to the top level by clicking the Azure DevOps logo. Click Collection Settings.. Under the Pipelines section click Agent Pools.
Click "New agent pool..." button and enter a descriptive name like "kubernetes-agents".

### Create PAT
To create a Personal Access Token, click your profile picture in the upper right corner and choose Security. Under Personal Access Token click +New Token and name it something good like "k8s-agents" and make sure you give permission to Agent Pools (READ & MANAGE). Leave the rest as defaults.

### Create secret in K8s
kubectl create secret generic registry --from-literal=VSTS_TOKEN=Personal-Access-Token --from-literal=VSTS_ACCOUNT=AzurePipeline-Account

### Deploy Agent in K8s
kubectl -n devops-jedi apply -f .\azp\agent.yaml

### Weird but true!
The reference to Azure DevOps Server in the agent.yaml called AZP_URL must include the collection. So https://tfstest.scbeval.net/tfs
will not suffice, https://tfstest.scbeval.net/tfs/SCB works though... This is a little trippy since agent pools are server wide?

### Run containers as root in Openshift
https://docs.openshift.com/enterprise/3.2/admin_guide/manage_scc.html
oc adm policy add-scc-to-group anyuid system:authenticated

### Make sure to check .Net Core dependencies for the agent!
In this case Ubuntu 18.04 is used as the base image which works great on new Azure DevOps Agents.
Remember that older version may have dependencies that were included in Ubuntu 16.04.

### Shell-scripts rocks but...
Everytime you make a change in the start.sh file remember that the linebreaks in the source repository will be CRLF. 
Linux dont like that too much so a trick is to start Git Bash and run the command "dos2unix start.sh" before building the image.

## Handle .NET Core SDK builds?
Best is to use the Install .NET Core SDK task provided in Azure DevOps - though there are some troubles with version 0.*.
I got it running using 1.* version of the task and specifying 3.x as the version. Kind good that this flexibility lays outside
of the image.

## Handle NPM and NodeJS builds?
Hmm, this was not really as easy as .NET Core - there are npm tasks but both of them require NPM on the agent already...
I found this post https://www.freecodecamp.org/news/how-to-install-node-js-on-ubuntu-and-update-npm-to-the-latest-version/
Which calls for a tool called NVM that kan install different versions of Node that not necessarily need to be in the Ubuntu store..