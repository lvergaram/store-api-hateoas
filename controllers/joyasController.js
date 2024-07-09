import {
  HATEOAS,
  HATEOASV2,
  orderValues,
  getJoyaById as fetchJoyaById,
  fieldsSelect,
  filtroCategory,
} from '../utils/functions.js';

export const getJoyas = (req, res) => {
  res.send({ joyas: HATEOAS() });
};

export const getJoyasV2 = (req, res) => {
  const { values, page } = req.query;
  if (values === 'asc' || values === 'desc') {
    return res.send(orderValues(values));
  }
  if (page) {
    const start = (page - 1) * 2;
    const end = start + 2;
    return res.send({ joyas: HATEOASV2().slice(start, end) });
  }
  res.send({ joyas: HATEOASV2() });
};

export const getJoyaById = (req, res) => {
  const id = parseInt(req.params.id);
  const joya = fetchJoyaById(id);
  if (joya) {
    res.send({ joya });
  } else {
    res.status(404).send({ error: '404 Not Found', message: 'No existe una joya con ese ID' });
  }
};

export const getJoyaFields = (req, res) => {
  const id = parseInt(req.params.id);
  const { fields } = req.query;
  const joya = fetchJoyaById(id);
  
  if (joya) {
    if (fields) {
      return res.send({ joya: fieldsSelect(joya, fields) });
    }
    return res.send({ joya });
  }
  
  res.status(404).send({
    error: '404 Not Found',
    message: 'No existe una joya con ese ID',
  });
};

export const getJoyasByCategory = (req, res) => {
  const { category } = req.params;
  const filteredJoyas = filtroCategory(category);
  
  res.send({
    cant: filteredJoyas.length,
    joyas: filteredJoyas,
  });
};
