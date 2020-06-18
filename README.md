<!--
*** Thanks for checking out this README Template. If you have a suggestion that would
*** make this better, please fork the donations and create a pull request or simply open
*** an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** jamrants, donations, twitter_handle, email
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![CI][ci-shield]][ci-url]

<!-- [![LinkedIn][linkedin-shield]][linkedin-url] -->

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/jamrants/donations">
    <img src="src/assets/icon.svg" alt="Logo" height="80" width="80">
  </a>

  <h3 align="center">Donations Revealed</h3>

  <p align="center">
    Corporations have made headlines with big pledges recently – tracking how much they'd be to the average person.
    <br />
    <a href="https://donations.exposed"><strong>View the Website »</strong></a>
    <br />
    <br />
    <a href="https://airtable.com/shrb6pZwkGX6rLIQa">Explore the dataset</a>
    ·
    <a href="https://github.com/jamrants/donations/issues">Report Bug</a>
    ·
    <a href="https://github.com/jamrants/donations/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!-- ABOUT THE PROJECT -->

## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com)

Here's a blank template to get started:
**To avoid retyping too much info. Do a search and replace with your text editor for the following:**
`jamrants`, `donations`, `twitter_handle`, `email` -->

### Built With

- [Gatsby](https://www.gatsbyjs.org/)
- [Airtable](https://airtable.com/)
- [Netlify](https://www.netlify.com/)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm

```sh
npm install npm@latest -g
```

- Gatsby CLI

```sh
npm install gatsby-cli -g
```

- Airtable

[Make a copy of our base](https://airtable.com/addBaseFromShare/shrb6pZwkGX6rLIQa?utm_source=airtable_shared_application), and make a note of your Airtable API key, and your Base ID.

[You can find your API key under your profile](assets/api_key_instructions.png)

[And you can find your Base ID under **help**](assets/base_id_instructions.png)

### Installation

1. Clone the repo

```sh
git clone https://github.com/jamrants/donations.git
```

2. Install NPM packages

```sh
npm install
```

3. Add Environment Variables

Create a file named `.env.development` in the root of the repo, and add the following info:

```
AIRTABLE_KEY=`yourAirtableKey`
BASE_ID=`yourBaseId`
```

4. Run Gatsby

```sh
gatsby develop
```

<!-- USAGE EXAMPLES -->

## Usage

This will be filled out at a later date

<!-- Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_ -->

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/jamrants/donations/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

We're using the [Gitflow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow).
Because Github Actions doesn't let us run our CI on a fork, please work off of the Develop branch so we can make sure Master doesn't break.

1. Fork the Project
2. Checkout the Develop Branch (`git checkout develop`)
3. Create your Feature Branch (`git branch feature/AmazingFeature`)
4. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the Branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request to the Develop Branch

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

[@jamrants](https://instagram.com/jamrants) - jamrants@retrocraft.ca

Project Link: [https://github.com/jamrants/donations](https://github.com/jamrants/donations)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [David Li](https://github.com/davidli3100)
- [James Ah Yong](https://github.com/RetroCraft)
- [Jason Huang](https://github.com/jhthenerd)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/jamrants/donations.svg?style=flat-square
[contributors-url]: https://github.com/jamrants/donations/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/jamrants/donations.svg?style=flat-square
[forks-url]: https://github.com/jamrants/donations/network/members
[stars-shield]: https://img.shields.io/github/stars/jamrants/donations.svg?style=flat-square
[stars-url]: https://github.com/jamrants/donations/stargazers
[issues-shield]: https://img.shields.io/github/issues/jamrants/donations.svg?style=flat-square
[issues-url]: https://github.com/jamrants/donations/issues
[license-shield]: https://img.shields.io/github/license/jamrants/donations.svg?style=flat-square
[license-url]: https://github.com/jamrants/donations/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[ci-shield]: https://github.com/jamrants/donations/workflows/CI/badge.svg
[ci-url]: https://github.com/jamrants/donations/actions?query=workflow%3ACI
[product-screenshot]: images/screenshot.png
