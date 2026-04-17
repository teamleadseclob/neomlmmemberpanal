import WalletCard from './WalletCard';

const WALLET_DATA = [
  {
    iconType: 'wallet',
    label: 'Main Wallet',
    amount: '$12,450.00',
  },
  {
    iconType: 'reward',
    label: 'Reward Wallet',
    amount: '$3,120.45',
    badge: null,
  },
  {
    iconType: 'profit',
    label: 'Trading Profit',
    amount: '$842.10',
  },
  {
    iconType: 'multilevel',
    label: 'Multilevel Rewards',
    amount: '$1,950.00',
    badge: null,
  },
  {
    iconType: 'cashback',
    label: 'SWP Cashback',
    amount: '$420.00',
    badge: null,
  },
  {
    iconType: 'total',
    label: 'Total Income',
    amount: '$18,782.55',
    isHighlighted: true,
  },
];

function WalletCardsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {WALLET_DATA.map((card) => (
        <WalletCard
          key={card.label}
          iconType={card.iconType}
          label={card.label}
          amount={card.amount}
          isHighlighted={card.isHighlighted}
        />
      ))}
    </div>
  );
}

export default WalletCardsGrid;
