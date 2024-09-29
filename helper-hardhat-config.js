
const networkConfig = {
    31337: {
        name: "localhost",
    },
    84532: {
        name:"Base Sepoila"
    },
    default: {
        name: "hardhat",
        interval: "30",
    },
};

const developmentChains = ["hardhat", "localhost"];

module.exports = {
    networkConfig,
    developmentChains,
};
