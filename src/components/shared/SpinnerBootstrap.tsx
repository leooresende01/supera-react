import './SpinnerBootstrap.css';
export function SpinnerBootstrap() {
	return (
		<div className="centralizar">
			<div className="spinner-border m-5" role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
		</div>
	);
}