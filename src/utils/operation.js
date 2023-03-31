// TODO 6 - Call buy_ticket entrypoint in the Lottery contract by completing buyTicketOperation
import { tezos } from "./tezos";

export const addBalanceOwnerOperation = async () => {
    try {
        const contract = await tezos.wallet.at("KT1BpifbAAPyzXqkgkABtJ6wgBVRQsjsJTRh");
        const op = await contract.methods.addBalanceOwner().send({
            amount: 50,
            mutez: false,
        })
        await op.confirmation(1);
    } catch (err) {
        throw err;
    }
}

export const addBalanceCounterpartyOperation = async () => {
    try {
        const contract = await tezos.wallet.at("KT1BpifbAAPyzXqkgkABtJ6wgBVRQsjsJTRh");
        const op = await contract.methods.addBalanceCounterparty().send({
            amount: 4,
            mutez: false,
        })
        await op.confirmation(1);
    } catch (err) {
        throw err;
    }
}


export const claimOwnerOperation = async () => {
    try {
        const contract = await tezos.wallet.at("KT1BpifbAAPyzXqkgkABtJ6wgBVRQsjsJTRh");
        const op = await contract.methods.claimOwner().send()
        await op.confirmation(1);
    } catch (err) {
        throw err;
    }
}

export const claimCounterpartyOperation = async () => {
    try {
        const contract = await tezos.wallet.at("KT1BpifbAAPyzXqkgkABtJ6wgBVRQsjsJTRh");
        const op = await contract.methods.claimCounterparty("1234567890").send()
        await op.confirmation(1);
    } catch (err) {
        throw err;
    }
}

export const allowRevertFundsOperation = async () => {
    try {
        const contract = await tezos.wallet.at("KT1BpifbAAPyzXqkgkABtJ6wgBVRQsjsJTRh");
        const op = await contract.methods.allowRevertFunds().send()
        await op.confirmation(1);
    } catch (err) {
        throw err;
    }
}

export const revertFundsOperation = async () => {
    try {
        const contract = await tezos.wallet.at("KT1BpifbAAPyzXqkgkABtJ6wgBVRQsjsJTRh");
        const op = await contract.methods.revertFunds().send({})
        await op.confirmation(1);
    } catch (err) {
        throw err;
    }
}

export const ownerAllowRevertOperation = async () => {
    try {
        const contract = await tezos.wallet.at("KT1BpifbAAPyzXqkgkABtJ6wgBVRQsjsJTRh");
        const op = await contract.methods.ownerAllowRevert().send({})
        await op.confirmation(1);
    } catch (err) {
        throw err;
    }
}

export const counterpartyAllowRevertOperation = async () => {
    try {
        const contract = await tezos.wallet.at("KT1BpifbAAPyzXqkgkABtJ6wgBVRQsjsJTRh");
        const op = await contract.methods.counterpartyAllowRevert().send({})
        await op.confirmation(1);
    } catch (err) {
        throw err;
    }
}