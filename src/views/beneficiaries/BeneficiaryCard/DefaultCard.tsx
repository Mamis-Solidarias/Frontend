import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import Card from '@mui/material/Card';

interface DefaultCardProps {
  sx: any;
  title: any;
  fields: any;
}

export const DefaultCard: FC<DefaultCardProps> = props => {
  const { title, fields, sx } = props;

  const style = { ...{ height: '100%' }, ...sx };

  return (
    <Card sx={style}>
      <CardContent sx={{ pt: theme => `${theme.spacing(2.0)}` }}>
        <Typography className={'MuiTypography--heading'} variant={'h6'} align={'center'}>
          {title}
        </Typography>
        {Object.keys(fields).map(key => (
          <>
            <Typography className={'MuiTypography--heading'}>{key}</Typography>
            <Typography className={'MuiTypography--subheading'} variant={'caption'}>
              {fields[key]}
            </Typography>
          </>
        ))}
      </CardContent>
    </Card>
  );
};
