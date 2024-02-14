# Airstack Frames

Collection of farcaster frames showcasing Airstack API capabilities

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.

### Requirements

To install and run this project you need:

- [Airstack API key](https://docs.airstack.xyz/airstack-docs-and-faqs/get-started/get-api-key "Airstack API key") (required for using Airstack APIs)
- [Node.js v18.17.0+](https://nodejs.org/ "Node.js")
- [git](https://git-scm.com/downloads "git") (only to clone this repository)

### Installation

To set up everything in your local machine, you need to follow these steps:

1. Clone this repo and then change directory to the `airstack-frames` folder:

```bash
git clone https://github.com/Airstack-xyz/airstack-frames.git
```

2. Navigate inside the project directory

```bash
cd airstack-frames
```

3. Install project dependencies using npm:

```bash
npm install
```

4. Create `.env.local` by copying `.env.sample`
```bash
cp .env.sample .env.local
```

5. Update the AIRSTACK_API_KEY key of `.env.local` file.
   To get the `AIRSTACK_API_KEY` follow [Airstack API key](https://docs.airstack.xyz/airstack-docs-and-faqs/get-started/get-api-key "Airstack API key") 
```bash
AIRSTACK_API_KEY="PUT_AIRSTACK_API_KEY_HERE"
FARCASTER_HUB_ENDPOINT="https://nemes.farcaster.xyz:2281"
BASE_URL="http://localhost:3000"
```
Note: Update BASE_URL appropriately, if deploying to production

### Running

To run the project simply run:

```bash
npm run dev
```

Your app should now be running on [http://localhost:3000/](http://localhost:3000/) and Farcaster OG frame should be accessible at this route [http://localhost:3000/og](http://localhost:3000/og) 

Note: For visualizing frame in localhost you can checkout https://github.com/framesjs/frames.js/tree/main/examples/framesjs-starter


## Resources

- [Frames.js Documentation](https://framesjs.org/)
- [Awesome frames](https://github.com/davidfurlong/awesome-frames)
- [Airstack Onchain Kit for Farcaster Frames](https://docs.airstack.xyz/airstack-docs-and-faqs/guides/farcaster/airstack-onchain-kit-for-farcaster-frames)
- [Airstack Node SDK](https://github.com/Airstack-xyz/airstack-node-sdk)


