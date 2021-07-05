#Inspired from https://stackoverflow.com/a/25515370/4556029
yell() { echo "$0: $*" >&2; }
die() {
  yell "$*"
  exit 111
}
try() { "$@" || die "cannot $*"; }

# check if enough arguments are provided
if [ "$#" -lt 3 ]; then
  die "4 arguments required, $# provided, 1st: Action, 2nd: Group, 3rd: Env, 4th: Profile, 5th Github token"
else
  yell "Action: '$1', Group: '$2', Environment: '$3', Profile: '$4'"
fi

# Construct file path
pipeline_config_path="config/$2/$3/pipeline.config.json"

# Check if config file exists
if [ -e $pipeline_config_path ]; then
  yell "Using config file: '$pipeline_config_path'"
else
  die "config file: '$pipeline_config_path' Not found"
fi

yell "Reading Parameters config file values"
# Check if jq is present
if [ ! -x "$(command -v jq)" ]; then
  die "Error: jq is not installed. Check 'System Requirements' section in ReadMe"
fi
yell "------------------------------------------------"
# Read values from config file, also convert output to empty string instead of null if key doesn't exist
config_region=$(jq -r .region//empty ${pipeline_config_path})
config_stack=$(jq -r .stack//empty ${pipeline_config_path})

# Ternary statement - https://stackoverflow.com/a/3953712/4556029
[ -z $config_region ] && die "Required config 'region' Not Defined" || yell "region = ${config_region}"
[ -z $config_stack ] && die "Required config 'stack' Not Defined" || yell "stack = ${config_stack}"

yell "------------------------------------------------"

config_parameters=$(jq -r -j '.parameters | to_entries | map(select(.value != "SSM")) | map("ParameterKey=\(.key),ParameterValue=\(.value|tostring) ") | join("")' ${pipeline_config_path})
additional_parameters="ParameterKey=Group,ParameterValue=${2} ParameterKey=Environment,ParameterValue=${3}"

# AWS profile
if [ -z "$4" ]; then
  var_common_params=""
else
  yell "Using AWS profile $4"
  var_common_params="--profile $4"
fi

# Github Token
if [ -n "$5" ]; then
  yell "Using github token provided"
  additional_parameters="${additional_parameters} ParameterKey=GithubToken,ParameterValue=${5}"
fi

stack_parameters="${config_parameters}${additional_parameters}"

case $1 in

'create')
  yell "Creating CloudFormation Stack"

  aws cloudformation create-stack \
    --capabilities CAPABILITY_IAM \
    --stack-name $config_stack \
    --region $config_region \
    --parameters $stack_parameters \
    --template-body file://pipeline.yaml \
    $var_common_params
  ;;

'update')
  yell "Updating CloudFormation Stack"

  aws cloudformation update-stack \
    --capabilities CAPABILITY_IAM \
    --stack-name $config_stack \
    --region $config_region \
    --parameters $stack_parameters \
    --template-body file://pipeline.yaml \
    $var_common_params
  ;;

'delete')
  yell "Deleting CloudFormation Stack"

  aws cloudformation delete-stack \
    --stack-name $config_stack \
    $var_common_params
  ;;

*)
  die "Unsupported action: $1"
  ;;
esac
