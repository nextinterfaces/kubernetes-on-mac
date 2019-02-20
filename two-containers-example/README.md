# kubernetes-on-mac

    
# Start

    minikube start
    
This can take a while, expected output:

    Starting local Kubernetes cluster...
    Kubectl is now configured to use the cluster.

Great! You now have a running Kubernetes cluster locally. Minikube started a virtual machine for you, and a Kubernetes cluster is now running in that VM.

# Check k8s

    kubectl get nodes
    
Should output something like:

    NAME       STATUS    ROLES     AGE       VERSION
    minikube   Ready     <none>    40s       v1.7.5
    
# Use minikube's built-in docker daemon:

    eval $(minikube docker-env)

    
If you now run `docker ps`, it should now output something like:

```
CONTAINER ID        IMAGE                                         COMMAND                 CREATED             STATUS              PORTS               NAMES
e97128790bf9        gcr.io/google-containers/kube-addon-manager   "/opt/kube-addons.sh"   22 seconds ago      Up 22 seconds                           k8s_kube-addon-manager_kube-addon-manager-minikube_kube-system_c654b2f084cf26941c334a2c3d6db53d_0
69707e54d1d0        gcr.io/google_containers/pause-amd64:3.0      "/pause"                33 seconds ago      Up 33 seconds                           k8s_POD_kube-addon-manager-minikube_kube-system_c654b2f084cf26941c334a2c3d6db53d_0
```

# Build, deploy and run an image on your local k8s setup

First setup a local registry, so Kubernetes can pull the image(s) from there:

    docker run -d -p 5000:5000 --restart=always --name registry registry:2

## Build Containers

Build `container-1` by running:

    cd container-1

    docker build . --tag my-app-1
    
You should now have an image named 'my-app' locally, check by using `docker images` (or your own image of course). You can then publish it to your local docker registry:

    docker tag my-app-1 localhost:5000/my-app-1:0.1.3

Similarly build `container-2` by running:

    cd container-2

    docker build . --tag my-app-2

    docker tag my-app-2 localhost:5000/my-app-2:0.1.3

    
Running `docker images` should now output the following:

```
REPOSITORY                                             TAG                 IMAGE ID            CREATED             SIZE
my-app                                                 latest              cc949ad8c8d3        44 seconds ago      89.3MB
localhost:5000/my-app-1                                0.1.3               cc949ad8c8d3        44 seconds ago      89.3MB
localhost:5000/my-app-2                                0.1.3               abc49ad17ade        44 seconds ago      89.3MB
httpd                                                  2.4-alpine          fe26194c0b94        7 days ago          89.3MB
```

## Deploy and run

Store the file below `my-app.yml` on your system and run the following:

    kubectl create -f my-k8.yml
    
You should now see your pod and your service:

    kubectl get all

The configuration exposes `my-k8` outside of the cluster, you can get the address to access it by running:

    minikube service my-k8 --url
    
This should give an output like:

    http://192.168.99.100:30303
    http://192.168.99.100:30304

allowing you to access it on your browser.

