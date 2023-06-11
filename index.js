const express = require('express');
const cors = require('cors');

const app = express();
const port = 4000;

// Flight prices data
const flightPrices = {
  Delhi: {
    Jaipur: {
      '15 April 2023': {
        indigo: '₹1,614',
        airAsia: '₹1,869',
        vistara: '₹2,133'
      },
      '16 April 2023': {
        indigo: '₹1,450',
        airAsia: '₹1,725',
        vistara: '₹2,020'
      }
    }
  },
  Mumbai: {
    Jaipur: {
      '15 April 2023': {
        indigo: '₹1,800',
        airAsia: '₹2,050',
        vistara: '₹2,350'
      },
      '16 April 2023': {
        indigo: '₹1,500',
        airAsia: '₹1,800',
        vistara: '₹2,100'
      }
    }
  },
  Chennai: {
    Delhi: {
      '17 April 2023': {
        indigo: '₹1,914',
        airAsia: '₹1,969',
        vistara: '₹2,233'
      },
      '18 April 2023': {
        indigo: '₹1,850',
        airAsia: '₹1,825',
        vistara: '₹2,220'
      }
    }
  },
  Goa: {
    Mumbai: {
      '17 April 2023': {
        indigo: '₹2,014',
        airAsia: '₹1,869',
        vistara: '₹2,233'
      },
      '18 April 2023': {
        indigo: '₹1,950',
        airAsia: '₹1,925',
        vistara: '₹2,420'
      }
    }
  },
  Jaipur: {
    Delhi: {
      '17 April 2023': {
        indigo: '₹2,014',
        airAsia: '₹1,869',
        vistara: '₹2,233'
      },
      '18 April 2023': {
        indigo: '₹1,950',
        airAsia: '₹1,925',
        vistara: '₹2,420'
      }
    }
  }
};

// Enable CORS
app.use(cors());

// Endpoint to fetch flight prices
app.get('/flights', (req, res) => {
  const { source, destination, date } = req.query;

  const sourceData = flightPrices[source];
  if (sourceData) {
    const destinationData = sourceData[destination];
    if (destinationData) {
      const prices = destinationData[date];
      if (prices) {
        res.json(prices);
        return;
      }
    }
  }

  res.status(404).json({ error: 'Flight prices not found' });
});

// Start the server
app.listen(port, () => {
  console.log(`Flight price app listening at http://localhost:${port}`);
});
