initial setup: 
gcloud projects create youtube-randomizer-1325234 --name="YoutubeRandomizer" + billing acc

- create oauth for google + spotify refresh tokens
- Set those in the application secrets

post deploy:
- Enable google login in firebase
- Set firestore rules:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /Player/{userId} {
      allow read, update, delete, create: if request.auth != null && request.auth.uid == userId;
    }
    match /Playlists/{userId} {
      allow read, update, delete, create: if request.auth != null && request.auth.uid == userId;
    }

  }
}
```