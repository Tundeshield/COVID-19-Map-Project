import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

function InfoBox({ title, cases, total }) {
	return (
		<Card className="infoBox" style={{ borderRadius: "10px" }}>
			<CardContent>
				{/*Title */}
				<Typography
					className="infoBox_title"
					color="textSecondary"
					style={{ color: "#050a30" }}
				>
					{title}
				</Typography>
				<h2
					className="infoBox_cases"
					style={{ color: "##bfc1c1", fontSize: "1.4rem" }}
				>
					Today: {cases}
				</h2>
				<Typography
					className="InfoBox_total"
					color="textSecondary"
					style={{ color: "#050a30" }}
				>
					Total: {total}
				</Typography>
			</CardContent>
		</Card>
	);
}

export default InfoBox;
