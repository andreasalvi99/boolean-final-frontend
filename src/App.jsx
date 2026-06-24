import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ComicsPage from "./pages/ComicsPage";
import DefaultLayout from "./layouts/DefaultLayout";
import ComicDetailPage from "./pages/ComicDetailPage";
import CharactersPage from "./pages/CharactersPage";
import CharacterDetailPage from "./pages/CharacterDetailPage";
import SearchResults from "./pages/SearchResultsPage";
import SearchResultsPage from "./pages/SearchResultsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/comics">
            <Route index element={<ComicsPage />} />
            <Route path=":id" element={<ComicDetailPage />} />
          </Route>
          <Route path="/characters">
            <Route index element={<CharactersPage />} />
            <Route path=":id" element={<CharacterDetailPage />} />
          </Route>

          {/*route per visualizzare risultati ricerca*/}
          <Route path="/search" element={<SearchResultsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
