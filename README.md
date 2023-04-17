initial setup: 
gcloud projects create youtube-randomizer-140712 --name="YoutubeRandomizer" ++ link billing account

TF_VAR_ProjectID=youtube-randomizer-140712
terraform -chdir=terraform/project-setup init && \
	terraform -chdir=terraform/project-setup apply -auto-approve

- create oauth for google + spotify refresh tokens
- Set those in the application secrets

post deploy:
- Enable google login in firebase