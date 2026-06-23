import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ComicsPage from "./pages/ComicsPage";
import DefaultLayout from "./layouts/DefaultLayout";
import ComicDetailPage from "./pages/ComicDetailPage";
import CharactersPage from "./pages/CharactersPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/comics" element={<ComicsPage />} />
          <Route path="/comics/:id" element={<ComicDetailPage />} />
          <Route path="/characters/" element={<CharactersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
