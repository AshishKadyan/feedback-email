# Metrica Integration Layer
This is the implementation for the Metrica Integration Layer architecture.
It uses AWS SAM as the underlying tool for managing developer workflow and related deployments.

## Getting Started

### 1. System Requirements and Cloning the Repository

Before proceeding in this section, your local development machine would need to have the following 

- OS
    - Ubuntu Linux (preferred), OR
    - Windows 10 Pro - Requires additional programs supporting Bash scripts for e.g. Git Bash, WSL(ubuntu) etc.
- GIT CLI - To clone this repository
- AWS CLI - Pre-requisite for SAM CLI
- SAM CLI - To build, package and deploy the application on AWS
- JQ - To read configuration json files by Bash script. Install from [here](https://stedolan.github.io/jq/download/).
- Docker - To invoke Lambda functions locally

#### CLONE the Repository
```bash
# Clone the Repo
git clone https://github.com/compro-cup-central/sam-metrica-ilayer.git

# Change directory
cd sam-metrica-ilayer
```

### 2. Environment Configurations

Environment configurations are placed in `config` folder at the root directory. Environments (and their corresponding config files) are organized into groups, e.g. `central`, `elt` etc. 
For each group, there are be multiple environments (one config file per environment) e.g `dev`, `qa`, `rel`, `hfx`, `prod`. In each environment, configuration is present in `sam.config.json`

The config files (one per environment) typically contain configuration and other inputs needed by the serverless application. While each environment is expected to have a number of fields, the values of those fields are expected to change based on the environment.

### 3. Developer Workflow Instructions

#### 3.1 Prerequisites: AWS IAM and Build Artifact S3 Bucket
You will need an AWS account to build and deploy this application. There are two key requirements:

* A S3 Bucket for SAM Build Artifacts - which the SAM CLI will use to host lambda packages (code) prior to deployment to AWS. For a quick start, create a S3 bucket called `cup-central-milyr-sam-dev` in the same AWS region in which stack is to be deployed
* An IAM with appropriate permissions to S3 bucket, AWS Lambda and AWS Cloudformation. For a quick start, create an IAM user with similar policy as mentioned in this [file](./etc/iam-policies/cup-central-local-metrica-ilayer-sam.json).

#### 3.2 SAM Config file
Following mandatory keys need to be present in every config file:
* app - Name of the application, e.g. 'milyr'. This name will be used to construct unique stacks in AWS cloud formation.
* region - AWS Region in which stack will be deployed, e.g. 'us-west-2'
* sam_s3 - Configurations related to AWS S3 bucket needed for SAM
   * bucket_name - The name of the S3 bucket used for uploading the build artifacts., e.g. 'cup-central-milyr-sam-dev' 
   * bucket_prefix - A prefix name that the command adds to the artifacts name when it uploads them to the S3 bucket. The prefix name is a path name (folder name) for the S3 bucket., e.g. 'sam-milyr'
* parameters - Key value map of custom application parameters (or environment variables), for e.g.
   * Key 1 - Value 1 
   * Key 2 - Value 2

#### 3.3 Build and Deploying the application

**Bash Script Arguments** - Bash script will expect 3 arguments for following listed command
   * Action - Supported actions are - `build` and `deploy`. Details are in next section.
   * Environment Group - Environments (and their corresponding config files) are be organized into groups, e.g. 'central', 'elt' etc. Supported value - `central`
   * Environment - For each environment group, there can be multiple environments (one config file per environment). Supported values - `dev`, `qa`, `rel`, `prod1`.
   * IAM Profile (Optional) - AWS Named profile, which should be used to run the script in case there are multiple profiles configured

For the given Group and Environment, there must be a sam configuration file present as mentioned in section above

##### BUILD
```bash
./aws_sam.sh build central dev
``` 
This  build command will first validate the template and then compile dependencies for Lambda functions. It will create a folder named `.aws-sam` in the root directory containing build artifacts that you can deploy to Lambda using the deploy command.

##### DEPLOY
```bash 
./aws_sam.sh deploy central dev
```
This command uses will first upload the build artifacts to S3 bucket and will then use that to deploy your application in the region mentioned in config file with stack name generated using combination of environment group, the environment and application name.

#### 3.4 Invoking Resources Locally

##### INVOKE Lambda function on AWS
```bash
aws lambda invoke --function-name <function-name> output.txt
``` 
"function-name" can have either the name or ARN of the deployed Lambda function - Refer AWS console for the same.

##### INVOKE Lambda function Locally

To run the lambda functions locally, System needs to have ```Docker``` (Docker Desktop for Windows) installed and running. 
```bash
sam local invoke <function-name>
```

#### Viewing Lambda stack `in AWS Console
To View created application in AWS Console, Visit [https://console.aws.amazon.com/lambda/home](https://console.aws.amazon.com/lambda/home)
The created application will show up in the list. On clicking the application, we can see the created Lambda functions.

### 4. CI/CD (AWS CodePipeline) Instructions
Details about adding CI-CD to the aws serverless application. Pipeline is also defined as code (pipeline.yaml) and generated using cloudformation. It uses AWS CodePipeline as CI/CD provider.

#### 4.1 Prerequisites: AWS IAM and Build Artifact S3 Bucket
Before creating the pipeline stack, we should have following AWS Resources handy

* A S3 Bucket for Pipeline Artifacts (in same AWS region in which stack is to be deployed) - which the Code Pipeline use for communicating between source and build stage. We can use same S3 bucket also which was used for storing SAM application build artifacts
* Following AWS IAMs
   * Create and Manage Pipeline - An IAM User having permissions to create/update pipeline resources. This IAM user will run the pipeline script. User can be created with similar policy as defined in [file](./etc/iam-policies/cup-central-nonprod-metrica-ilayer-create-stack.json)
   * Ops IAM - An IAM User responsible to manage deployments - have permissions to invoke pipeline via console, access to code build logs. User can be created with similar policy as defined in [file](./etc/iam-policies/cup-central-nonprod-metrica-ilayer-ops-console.json)

#### 4.2 Key Files
Following are the key files required to create pipeline stack
 * `pipeline.yaml` - File, present at the root, is the AWS Cloudformation template for creating code pipeline. It has details of required resources, i.e. code pipeline, code build, and IAM roles required. Pipeline accept some parameters to configure it as per the requirement. 
 * `buildspec.yaml` - BuildSpec file is used by code build project which is created as part of pipeline creation. It has the list of commands which are used to build sam application from code build project. 
 * `pipeline.sh` - This shell script file present at the root is used to trigger the aws clouManagdformation commands to create the pipeline and pass the parameters as required based on environment for which pipeline is configured. More details about it are provided in sections below

#### 4.3 Pipeline Config file

The `pipeline.config.json` typically contain configuration and other inputs needed by the cloudformation template. While each environment is expected to have a number of fields, the values of those fields are expected to change based on the environment.

Following are the description of various fields of pipeline.json
* region - AWS Region in which stack will be deployed, e.g. 'us-west-2'
* stack - Name of AWS Stack that will be created, e.g. 'cup-central-dev-milyr-cf'
* parameters - Key value map of custom application parameters which are passed to cloudformation template to configure the pipeline, for e.g.
   * PipelineProjectName - Name of pipeline to be cerated, e.g. 'cup-central-dev-milyr-cp'
   * CodeBuildProjectName - Name of build project to be use by pipeline, e.g. 'cup-central-dev-milyr-cb'
   * ArtifactS3BucketName - Name of bucket used to store artifacts as requried by code pipeline and code build.
   * GithubUser - Name of github user
   * GithubRepo - Name of github repository
   * GithubBranch - Name of github branch to be associated with code pipeline

#### 4.4 Pipeline script - configuration and actions

**Bash Script Arguments** - Bash script will expect 5 arguments for following listed command
   * Action - Supported actions are - `create` and `update`. Details are in next section.
   * Environment Group - Environments (and their corresponding config files) are be organized into groups, e.g. 'central', 'elt' etc. Supported value - `central`
   * Environment - For each environment group, there can be multiple environments (one config file per environment). Supported values - `dev`, `qa`, `rel`, `prod1`.
   * IAM Profile (Optional) - If multiple profiles are configured on a system, we can pass the name of aws profile to be used to execute the script
   * Github Oauth Token (Optional) - GitHub personal access token for this application. See [here](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line) for how to create the token - CodePipeline needs just the repo scope permissions. Other option is to pass a random string and authenticate by console by editing the pipeline

For the given Group and Environment, there must be a configuration file present as mentioned in section above


##### CREATE
```bash
./pipeline.sh create central dev
``` 
This command will pick the required configuration file and use the values defined in that to create a new stack in the region specified. It will use the parameters defined in cofniguration file to create the code pipeline. Upon creation, pipeline will trigger automatically

##### UPDATE
```bash 
./pipeline.sh update central dev
```
In case pipeline stack needs to be update, this command can be used to update the pipeline or code build property

#### 4.5 Steps to setup pipeline
Follow the below steps to setup pipeline stack.
* Login to machine having AWS cli configured with IAM credentials having permissions to create and update stack
* Checkout the git repository
* Verify the pipeline configuration file for which stack is to be created
* Execute pipeline script to create the stack
* Verify from Cloudformation console that pipeline is setup

 
#### 4.6 Viewing CodePipeline Project in AWS Console
To View created application in AWS Console, Visit [Link](https://us-west-2.console.aws.amazon.com/cloudformation/home?region=us-west-2#/). Change Region if required. The newly created stack will show here

To see the pipeline, Visit [Link](https://us-west-2.console.aws.amazon.com/codesuite/codepipeline/pipelines?region=us-west-2), Change region if required. You will see the Source and Build stage of pipeline. Clicking 'Release Changes' button will trigger the pipeline for the latest code


## Project Structure
```
├───template.yaml               # SAM Template
├───pipeline.yaml               # Cloudformation file having code pipeline stack config
├───buildspec.yaml              # Build file having commands used by Code build
├───aws_sam.sh                  # She;; script for deploying sam application
├───pipeline.sh                 # Shell script for creating pipeline stack
├───config                      # Folder holding configuration files
│   central                         # Folder representing Environment Group
│       └───dev                          # Folder representing Environment
│           └───sam.config.json                 # Config json file having sam configuration
│           └───pipeline.config.json            # Config json file having Pipeline configuration
├───functions                   # Contains source code for Lambda functions
│   └───process-test                      # Folder depictng lambda function
│       └───index.js                   # Main JS file containing Lambda Handler
│       └───package.json                # Standard NPM package.json for dependencies and other metadata
```

### Guidelines for adding New Functions
Follow the below steps to add a New Function

 - Create a New Folder under `/functions` similar to existing function
 - Create a main file of the function and add handler function code.
 - Add the resource to `template.yaml` file under `Resources` node
 - Build and Deploy the application