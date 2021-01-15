import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

function InfoBox({ title,isRed, cases, active, total, ...props }) {
	return (
		<Card className={`infoBox ${active && "infoBox--selector"} ${isRed && "infoBox--red"}`} onClick={props.onClick}>
			<CardContent>
				{/*Title */}
				<Typography className="infoBox_title" color="textSecondary">
					{title}
				</Typography>
				<h2 className="infoBox_cases">Today: {cases}</h2>
				<Typography className="InfoBox_total" color="textSecondary">
					Total: {total}
				</Typography>
			</CardContent>
		</Card>
	);
}

export default InfoBox;
