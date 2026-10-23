import axios from 'axios';

export const fetchWikiImage = async (name, context) => {
  try {
    const searchRes = await axios.get('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        list: 'search',
        srsearch: `${name} ${context}`,
        format: 'json',
        origin: '*',
      },
    });

    const results = searchRes.data.query.search;
    if (!results || results.length === 0) return null;

    const pageTitle = results[0].title;

    const summaryRes = await axios.get(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageTitle)}`
    );

    return summaryRes.data.originalimage?.source || summaryRes.data.thumbnail?.source || null;
  } catch {
    return null;
  }
};