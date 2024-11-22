dotnet format



cd terraform
terraform init -backend-config="configs/dev/dev.config.remote.tfbackend"
terraform plan -var-file "./configs/dev/dev.tfvars"