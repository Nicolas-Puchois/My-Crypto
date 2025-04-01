// la route API [ex http://loclahost:8000]
const apiUrl = "https://api.rawg.io/api";

// fonction asynchrone
// besoin d'un await dans une fonction async
// ex route => /blog
// options => { Accept: 'application/json'}

/**
 *
 * @param {string} route
 * @param {object} option
 * @returns  {Promise}
 */
export async function fetchData({ route, options = {} }) {
  // Préparation de l'entête 'headers' avec les clés - valeurs nécessaire pour l'appel [ Authorization: 'Bearer qs4dz68a4qz']
  const headers = { Accept: "application/json", ...options.headers };
  //  appel methode native fetch [ appels API]
  const result = await fetch(`${apiUrl}${route}`, { ...options, headers });
  if (result.ok) {
    return result.json();
  }
  throw new Error("Erreur serveur", { cause: result });
}
