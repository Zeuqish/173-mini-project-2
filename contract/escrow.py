# Escrow - Example for illustrative purposes only.

import smartpy as sp

class Escrow(sp.Contract):
    def __init__(self, owner, fromOwner, counterparty, fromCounterparty, epoch, hashedSecret, admin):
        self.init(fromOwner           = fromOwner,
                  fromCounterparty    = fromCounterparty,
                  balanceOwner        = sp.tez(0),
                  balanceCounterparty = sp.tez(0),
                  hashedSecret        = hashedSecret,
                  epoch               = epoch,
                  owner               = owner,
                  counterparty        = counterparty,
                  admin               = admin,
                  allowRevertAdmin    = sp.bool(False),
                  ownerAllowRevert    = sp.bool(False),
                  counterpartyAllowRevert = sp.bool(False))

    @sp.entry_point
    def addBalanceOwner(self):
        sp.verify(self.data.balanceOwner == sp.tez(0))
        sp.verify(sp.amount == self.data.fromOwner)
        self.data.balanceOwner = self.data.fromOwner

    @sp.entry_point
    def addBalanceCounterparty(self):
        sp.verify(self.data.balanceCounterparty == sp.tez(0))
        sp.verify(sp.amount == self.data.fromCounterparty)
        self.data.balanceCounterparty = self.data.fromCounterparty

    def claim(self, identity):
        sp.verify(sp.sender == identity)
        sp.send(identity, self.data.balanceOwner + self.data.balanceCounterparty)
        self.data.balanceOwner = sp.tez(0)
        self.data.balanceCounterparty = sp.tez(0)

    @sp.entry_point
    def claimCounterparty(self, params):
        sp.verify(sp.now < self.data.epoch)
        sp.verify(self.data.hashedSecret == sp.blake2b(params.secret))
        self.claim(self.data.counterparty)

    @sp.entry_point
    def claimOwner(self):
        sp.verify(self.data.epoch < sp.now)
        self.claim(self.data.owner)

    @sp.entry_point
    def allowRevertFunds(self):
        sp.verify(sp.sender == self.data.admin)
        self.data.allowRevertAdmin = sp.bool(True)

    @sp.entry_point
    def revertFunds(self):
        sp.verify(sp.sender == self.data.admin)
        sp.verify(self.data.allowRevertAdmin == sp.bool(True))
        sp.verify(self.data.ownerAllowRevert == sp.bool(True))
        sp.verify(self.data.counterpartyAllowRevert == sp.bool(True))
        sp.send(self.data.owner, self.data.balanceOwner)
        sp.send(self.data.counterparty, self.data.balanceCounterparty)
        self.data.balanceOwner = sp.tez(0)
        self.data.balanceCounterparty = sp.tez(0)

        self.data.counterpartyAllowRevert = sp.bool(False)
        self.data.ownerAllowRevert = sp.bool(False)
        self.data.allowRevertAdmin = sp.bool(False)

    @sp.entry_point
    def ownerAllowRevert (self):
        sp.verify(sp.sender == self.data.owner)
        sp.verify(self.data.allowRevertAdmin == sp.bool(True))
        sp.verify(self.data.ownerAllowRevert == sp.bool(False))
        self.data.ownerAllowRevert = sp.bool(True)

    @sp.entry_point
    def counterpartyAllowRevert (self):
        sp.verify(sp.sender == self.data.counterparty)
        sp.verify(self.data.allowRevertAdmin == sp.bool(True))
        sp.verify(self.data.counterpartyAllowRevert == sp.bool(False))
        self.data.counterpartyAllowRevert = sp.bool(True)
        
        

@sp.add_test(name = "Escrow")
def test():
    scenario = sp.test_scenario()
    scenario.h1("Escrow")
    c1 = Escrow(sp.address("tz1KxgFc6knZgc5gipvFqqT59JYMi8o63VdL"), sp.tez(50), sp.address("tz1NRpa79kAY3jqvL9sSMZyEBGYn7mKwAgBS"), sp.tez(4), sp.timestamp(1680087055), sp.blake2b(sp.bytes("0x1234567890")), sp.address("tz1KxgFc6knZgc5gipvFqqT59JYMi8o63VdL"))
    scenario += c1

sp.add_compilation_target("escrow", 
                          Escrow(sp.address("tz1KxgFc6knZgc5gipvFqqT59JYMi8o63VdL"), 
                         sp.tez(50), sp.address("tz1NRpa79kAY3jqvL9sSMZyEBGYn7mKwAgBS"),
                         sp.tez(4), sp.timestamp(1680087055), 
                         sp.blake2b(sp.bytes("0x1234567890")), 
                         sp.address("tz1KxgFc6knZgc5gipvFqqT59JYMi8o63VdL")))
