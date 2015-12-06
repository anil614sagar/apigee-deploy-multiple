# apigee-deploy-multiple
Deploy Multiple Proxies at once

# Installation

You can install `apigeedm` either through npm or by cloning and linking the code from GitHub.  This document covers the installation details for installing from npm.

## Installation from npm

The `apigeedm` module and its dependencies are designed for Node.js and is available through npm using the following command:

### From a Terminal Window:
```bash
$ sudo npm install -g apigeedm
```

# <a name="reference"></a>Command reference and examples

* [apigeedm](#apigeedm)

## <a name="apigeedm"></a>apigeedm

Helps you deploy multiple proxies at one go.

#### Examples

```bash
$ apigeedm -s /Users/Anil/Desktop/multipleProxies -b https://api.enterprise.apigee.com -o ORGNAME -u USERNAME -p PASSWORD -e ENVNAME -v VIRTUALHOSTS
```

#### Articles

<a href="https://community.apigee.com/articles/14186/deploy-multiple-apigee-proxies-at-one-go-apigeedm.html">Deploy Multiple Apigee Proxies at one go - ApigeeDM</a>