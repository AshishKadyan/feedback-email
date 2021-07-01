# CUP AWS Serverless Code Pipeline 
This details about adding CI-CD to the aws serverless application. Pipeline is also defined as code (pipeline.yaml) and generated using cloudformation. It uses AWS CodePipeline as CI/CD provider

## Getting Started

### 1. Key Files
Following are the key files required to create pipeline stack
 * `pipeline.yaml` - File present at the root is the AWS Cloudformation template for creating code pipeline. It has details of required resources, i.e. code pipeline, code build, s3 bucket, IAM roles required. Pipeline accept some parameters to configure it as per the requirement. Currently it is configured with Github as source because integration with Gitlab is not provided out of the box by AWS CodePipeline
 * `buildspec.yaml` - BuildSpec file is used by code build project which is created as part of pipeline creation. It has the list of commands which are used to build sam application from code build project. 
 * `create-pipeline.sh` - This shell script file present at the root is used to trigger the aws cloudformation commands to create the pipeline and pass the parameters as required based on environment for which pipeline is configured. More details about it are provided in sections below

### 2. Environment Configurations

Environment configurations (pipeline.json) are placed in `config` folder at the root directory. Environments (and their corresponding config files) are organized into groups, e.g. `central`, `elt` etc. 
For each group, there are be multiple environments (one config file per environment) e.g `qa`, `rel`, `prod1`, `rel`. 

The pipeline.json typically contain configuration and other inputs needed by the cloudformation template. While each environment is expected to have a number of fields, the values of those fields are expected to change based on the environment.

Following are the description of various fields of pipeline.json
* region - AWS Region in which stack will be deployed, e.g. 'us-west-2'
* stack - Name of AWS Stack that will be created, e.g. 'qa-pipeline-stack'
* parameters - Key value map of custom application parameters which are passed to cloudformation template to configure the pipeline, for e.g.
   * PipelineProjectName - Name of pipeline to be cerated, e.g. 'sam-qa-pipeline'
   * CodeBuildProjectName - Name of build project to be use by pipeline, e.g. 'sam-qa-codebuild'
   * S3BucketName - Name of bucket which is to be created. Bucket is required by Code Pipeline and same bucket can be used by SAM Application as well 
   * GithubUser - Name of github user
   * GithubRepo - Name of github repository
   * GithubBranch - Name of github branch to be associated with code pipeline

### 3. System Requirements and Cloning the Repository

Before proceeding in this section, your local development machine would need to have the following 

- OS
    - Ubuntu Linux (preferred), OR
    - Windows 10 Pro - Requires additional programs supporting Bash scripts for e.g. Git Bash, WSL(ubuntu) etc.
- GIT CLI - To clone this repository
- AWS CLI - Pre-requisite for SAM CLI
- JQ - To read configuration json files by Bash script. Install from [here](https://stedolan.github.io/jq/download/).

#### CLONE the Repository
```bash
# Clone the Repo
git clone https://gitlab.com/cup-lti-gateway/cup-aws-serverless-seed.git

# Change directory
cd cup-aws-serverless-seed
```

### 4. Creating Pipeline via shell script file

**Bash Script Arguments** - Bash script will expect 3 arguments for following listed command
   * Environment Group - Environments (and their corresponding config files) are be organized into groups, e.g. 'central', 'elt' etc. Supported value - `central`
   * Environment - For each environment group, there can be multiple environments (one config file per environment). Supported values - `qa`, `rel`, `prod1`, `rel`.
   * Github Oauth Token - GitHub personal access token for this application. See [here](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) for how to create the token - CodePipeline needs just the repo scope permissions. 

For the given Group and Environment, there must be a configuration file present as mentioned in section above

```bash
./create-pipeline.sh central qa xxyyzz
``` 
This command will pick the required configuration file and use the values defined in that to create a new stack in the region specified. It will use the parameters defined in cofniguration file to create the code pipeline
 
## Viewing in AWS Console
To View created application in AWS Console, Visit [Link](https://us-west-2.console.aws.amazon.com/cloudformation/home?region=us-west-2#/). Change Region if required. The newly created stack will show here

To see the pipeline, Visit [Link](https://us-west-2.console.aws.amazon.com/codesuite/codepipeline/pipelines?region=us-west-2), Change region if required. You will see the SOurce and Build stage of pipeline. Clicking 'Release Changes' button will trigger the pipeline for the latest code