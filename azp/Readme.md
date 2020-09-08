## Setup Azure Devops Server Agent in Kubernetes

### Lab environment
Azure DevOps Server: https://tfstest/tfs/

K8s cluster: https://api.scbclu01.scbeval.net:6443 (Openshift)

### Create organization for Agent Pool
Go to the top level by klicking the Azure DevOps logo. Click Collection Settings.. Under the Pipelines section click Agent Pools.
Click "New agent pool..." button and enter a descriptive name like "kubernetes-agents".

### Create PAT
To create a Personal Access Token, click your profile picture in the upper right corner and choose Security. Under Personal Access Token click +New Token and name it something good like "k8s-agents" and make sure you give permission to Agent Pools (READ & MANAGE). Leave the rest as defaults.

### Create secret in K8s
kubectl create secret generic registry --from-literal=VSTS_TOKEN=Personal-Access-Token --from-literal=VSTS_ACCOUNT=AzurePipeline-Account

kubectl create secret generic registry --from-literal=VSTS_TOKEN=544qa3qevijxklk7fa6reigiek7tw5fq5jqumi4a5uy56azgclia --from-literal=VSTS_ACCOUNT=scbtomo

### Deploy Agent in K8s
kubectl -n devops-jedi apply -f .\azp\agent.yaml