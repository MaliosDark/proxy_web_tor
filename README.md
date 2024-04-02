# Proxy Web with Tor

Proxy web based on Node.js utilizing Tor for country switching.

##Structure

proxy-web-tor/
│
├── src/
│   ├── index.js
│   ├── views/
│   │   ├── index.ejs
│   │   ├── proxy.ejs
│   │   ├── proxyResult.ejs
│   │   └── redirect.ejs
│   └──────         
├── package-lock.json
├── package.json
├── README.md
└── LICENSE





## Installation

Before running the project, make sure you have Node.js and npm installed on your machine.

### Node.js Installation

#### Windows

You can download the installer from the [official Node.js website](https://nodejs.org/). Follow the installation instructions provided.

#### macOS

For macOS users, you can install Node.js using [Homebrew](https://brew.sh/). Open Terminal and run the following command:

```bash
brew install node
```

#### Linux

On Linux distributions, you can install Node.js using your package manager. For example, on Ubuntu, you can use:

```bash
sudo apt update
sudo apt install nodejs npm
```

### Project Setup

1. Clone this repository to your local machine:

```bash
git clone https://github.com/Malios_Dark/proxy-web-tor.git
```

2. Navigate to the project directory:

```bash
cd proxy-web-tor
```

3. Install project dependencies using npm:

```bash
npm install
```

## Running the Server

To start the server, run the following command:

```bash
npm start
```

The server will start running on port 3000 by default.

## Setting up Tor

To use Tor for proxying, you need to have Tor installed and running on your machine. Follow the instructions below based on your operating system:

### Windows

1. Download the Tor Expert Bundle from the [official Tor website](https://www.torproject.org/download/tor/).

2. Extract the downloaded file to a directory of your choice.

3. Open Command Prompt and navigate to the directory where Tor is installed.

4. Start Tor by running the following command:

```bash
tor.exe
```

### macOS

1. Install Tor using Homebrew:

```bash
brew install tor
```

2. Start Tor by running the following command:

```bash
tor
```

### Linux

1. Install Tor using your package manager. For example, on Ubuntu:

```bash
sudo apt update
sudo apt install tor
```

2. Start Tor by running the following command:

```bash
sudo service tor start
```

## Usage

Once the server is running and Tor is set up, you can access the proxy web interface by opening a web browser and navigating to `http://localhost:3000`.

Enter a URL in the provided input field and click "Browse" to access the website through the proxy.

## Contributors

- Andryu Schittone <malios666@gmail.com>

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



