import Fastlane from "@zynk/fastlane";
const fastlane = Fastlane("34.73.11.238:50051");

import { GetBalancesRequest, Balances } from "@zynk/fastlane";

const balanceRequest: GetBalancesRequest = {
  // can accept addresses, known signers and partnerIds
  of: [
    "81aLwbkfedhZwjaKUT9rzSBfYZMUvV7o8gbXmCiBjEp7",
    "manager",
    "ZOW",
    "zp_test",
  ],
  // token: fastlane.Token.USDC, // (optional) - to fetch specific token balance
};
const response: Balances = await fastlane.base.getBalances(balanceRequest);

console.log(response);
/*
  {
    "data": [
      {
        "of": "81aLwbkfedhZwjaKUT9rzSBfYZMUvV7o8gbXmCiBjEp7",
        "address": "81aLwbkfedhZwjaKUT9rzSBfYZMUvV7o8gbXmCiBjEp7",
        "balances": {
          "SOL": {
            "amount": "789977208",
            "uiAmount": "0.789977208",
            "asset": {
              "symbol": "SOL"
            }
          },
          "USDC": {
            "amount": "1090000",
            "uiAmount": "1.09",
            "asset": {
              "symbol": "USDC",
              "address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "token": 0
            }
          }
        }
      },
      {
        "of": "manager",
        "address": "CRYpBZS8fFHBMTmypUoxXWdiQ8jVcnEVukGzNvuzRUeb",
        "balances": {
          "SOL": {
            "amount": "5841605467",
            "uiAmount": "5.841605467",
            "asset": {
              "symbol": "SOL"
            }
          },
          "USDC": {
            "amount": "1",
            "uiAmount": "0.000001",
            "asset": {
              "symbol": "USDC",
              "address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "token": 0
            }
          },
          "USDT": {
            "amount": "1",
            "uiAmount": "0.000001",
            "asset": {
              "symbol": "USDT",
              "address": "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
              "token": 1
            }
          }
        }
      },
      {
        "of": "ZOW",
        "address": "GbNjfHHBLFn3epGUwKQacbTD4YBqAMLNHHtKRNATHaep",
        "balances": {
          "SOL": {
            "amount": "793779867",
            "uiAmount": "0.793779867",
            "asset": {
              "symbol": "SOL"
            }
          },
          "ZYNKC": {
            "amount": "0",
            "uiAmount": "0",
            "asset": {
              "symbol": "ZYNKC",
              "address": "ZynKrfVV84zpF8HfAV12kV2uP51sFrT1T1b8LwrgU14"
            }
          },
          "USD1": {
            "amount": "0",
            "uiAmount": "0",
            "asset": {
              "symbol": "USD1",
              "address": "USD1ttGY1N17NEEHLmELoaybftRBUSErhqYiQzvEmuB",
              "token": 3
            }
          },
          "USDC": {
            "amount": "2253368363029",
            "uiAmount": "2253368.363029",
            "asset": {
              "symbol": "USDC",
              "address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
              "token": 0
            }
          },
          "USDT": {
            "amount": "20512966",
            "uiAmount": "20.512966",
            "asset": {
              "symbol": "USDT",
              "address": "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
              "token": 1
            }
          },
          "RLUSD": {
            "amount": "0",
            "uiAmount": "0",
            "asset": {
              "symbol": "RLUSD",
              "address": "FMHpvrXeNPZieGVQTELkvVPRZRXMNgpMoSSW8wBc2v31",
              "token": 4
            }
          },
          "PYUSD": {
            "amount": "0",
            "uiAmount": "0",
            "asset": {
              "symbol": "PYUSD",
              "address": "2b1kV6DkPAnxd5ixfnxCpjxmKwqjjaYmCZfHsFu24GXo",
              "token": 2
            }
          }
        }
      },
      {
        "of": "zp_test",
        "address": "8fvKErmG7Yk63rfjHH7yTri8sAwxV8HkpXctj4kn3CUT",
        "balances": {
          "SOL": {
            "amount": "0",
            "uiAmount": "0",
            "asset": {
              "symbol": "SOL"
            }
          }
        }
      }
    ]
  }
*/
