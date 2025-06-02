import SpotsListPage from '../SpotsListPage';

export default function  LandingPage() {
    return (
        <div>
      <h1>Place2Stay</h1>
      <p>Anywhere you gotta go, everywhere you wanna be.</p>
      <SpotsListPage /> {/* Spot tiles render here now */}
    </div>
    );
}