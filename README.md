<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/desmaraisp/YoutubeRandomizer">
    <img style="border-radius:10px;" src="next-app/public/favicon.svg" alt="Logo" width="120" height="120">
  </a>

  <p align="center">Seamlessly merge playlists together across both spotify and youtube in one easy-to-use interface.</p>
  <p><a href="https://github.com/desmaraisp/YoutubeRandomizer/issues">Report Bug or Request Feature</a></p>
</div>

- [About The Project](#about-the-project)
	- [Built With](#built-with)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## About The Project
### Built With

This project uses the following technologies, among others:
* <span style="vertical-align: middle;">[![NextJS][nextjs-shield]][nextjs-url]</span>
* <span style="vertical-align: middle;">[![Supabase][supabase-shield]][supabase-url]</span>
* <span style="vertical-align: middle;">[![Prisma][prisma-shield]][prisma-url]</span>

* Google Cloud Run

## Development

- Create `env.local` file in `next-app` dir with content:
```
SPOTIFY_CLIENT_ID="d9fc68df059041e9bed6b9c217611541"
SPOTIFY_CLIENT_SECRET="4d0be00170194283908b7a382a42f421"
YOUTUBE_API_KEY="AIzaSyA9pZidzfLhj-UH-7WWDvadKeEaLwt4SHI"
```

- Start application
```
# Start database
npm ci && npx supabase start

cd ./next-app/
# Install app dependencies and configure database
npm ci && npx prisma migrate dev

npm run dev
```

- Start developing at `https://locahost:3000`


## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request





<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.





<!-- CONTACT -->
## Contact

[/u/desmaraisp](http://www.reddit.com/message/compose?to=desmaraisp&subject=Hello%20there!)


[email](mailto:philippe.desmarais4@gmail.com)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/desmaraisp/YoutubeRandomizer.svg?style=flat
[contributors-url]: https://github.com/desmaraisp/YoutubeRandomizer/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/desmaraisp/YoutubeRandomizer.svg?style=flat
[forks-url]: https://github.com/desmaraisp/YoutubeRandomizer/network/members
[stars-shield]: https://img.shields.io/github/stars/desmaraisp/YoutubeRandomizer.svg?style=flat
[stars-url]: https://github.com/desmaraisp/YoutubeRandomizer/stargazers
[issues-shield]: https://img.shields.io/github/issues/desmaraisp/YoutubeRandomizer.svg?style=flat
[issues-url]: https://github.com/desmaraisp/YoutubeRandomizer/issues
[license-shield]: https://img.shields.io/github/license/desmaraisp/YoutubeRandomizer.svg?style=flat
[license-url]: https://github.com/desmaraisp/YoutubeRandomizer/blob/master/LICENSE

[nextjs-shield]: https://img.shields.io/badge/nextjs-000000?style=for-the-badge&logo=nextjs&logoColor=white
[nextjs-url]: https://nextjs.org/
[prisma-shield]: https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=prisma&logoColor=white
[prisma-url]: https://prisma.io/
[supabase-shield]: https://img.shields.io/badge/supabase-black?style=for-the-badge&logo=python&logoColor=white
[supabase-url]: https://supabase.com/
