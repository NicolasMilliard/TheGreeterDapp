const contractAddress = "0x83fcA49adF276d261D9A4935fCFd05bD67253413";

const goerliABI = [
  {
    inputs: [],
    name: "getGreetings",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_greetings",
        type: "string",
      },
    ],
    name: "setGreetings",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export default {
  contractAddress,
  goerliABI,
};
