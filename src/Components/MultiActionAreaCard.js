import * as React from "react";
import { Card, CardContent, CardMedia, Button, Typography, CardActionArea, CardActions } from "@mui/material";

export default function MultiActionAreaCard({element}) {
  
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
          <CardActionArea>
            
            <CardContent>
              <Typography gutterBottom variant="h1" component="div">
                TotalSales
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {element.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Order
            </Button>
          </CardActions>
        </Card>
  );
}
