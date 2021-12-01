import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
const axios = require('axios');

let credit = 10;
let address = null;

@Injectable()
export class StartonService {
  getWallet(): number {
    return credit;
  }

  addCredit(amount): string {
    credit += amount;
    return `You bought ${amount} credit.`;
  }

  creditMjtn(amount): string {
    const http = axios.create({
      baseURL: 'https://api-connect.starton.io/v1',
      headers: {
        'x-api-key': 'pk_8e6b4070218146828e28530307a38723',
      },
    });
    http
      .post('/smart-contract/sc_feed0471ca1c4f33a41033e912818180/interact', {
        functionName: 'mint',
        params: [address, `${amount}000000000000000000`],
      })
      .then((response) => {
        console.log(response.data);
      });
    return `You have now ${credit}`;
  }

  deposit(amount): number {
    credit += amount;
    return credit;
  }

  roll(): number {
    credit -= 1;
    return credit;
  }

  checkSignature(signature): string {
    console.log('signature : ');
    address = ethers.utils.verifyMessage('Welcome to Starton', signature);

    console.log('address : ', address);
    return 'Succesfully signed';
  }
}
