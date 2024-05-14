export default function getSimpleDate(): string {
  return new Date().toISOString().slice(0,10);
}