// Quick CLI verification of Poseidon commitments
import { computeRecipientCommitment, generateBytes32 } from '../src/lib/midnight/stealth-service';

const testSalt = generateBytes32('test_salt');
const comm = computeRecipientCommitment('mn_addr_preprod1xyz', 10000, testSalt);
console.log('[Commitment Generated]', comm);
