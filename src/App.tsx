import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { Loop } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { Assento } from "./@types";
import { Header } from "./components/Header";

function App() {
  const keyAssentos = "@Reserva:assentos";

  const [assentos, setAssentos] = useState<Assento[]>([] as Assento[]);
  const [assento, setAssento] = useState<Assento>({} as Assento);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    // Carrega assentos da localStorage, se não existir, adiciona
    let storageAssentos = JSON.parse(localStorage.getItem(keyAssentos) || "[]");

    if (!storageAssentos || storageAssentos.length === 0) {
      storageAssentos = Array<Assento>();

      for (let i = 1; i <= 32; i++) {
        storageAssentos.push({ nro: i, reservado: false });
      }

      // Grava os assentos na localStorage
      localStorage.setItem(keyAssentos, JSON.stringify(storageAssentos));
    }

    setAssentos(storageAssentos);
  }, []);

  function reservarAssento(assento: Assento) {
    setOpenDialog(true);

    setAssento(assento);
  }

  function confirmaReserva(assento: Assento) {
    const newAssento = {
      reservado: true,
      nro: assento.nro
    } as Assento;

    setAssento(newAssento);

    const indexAssento = assentos.indexOf(assento);

    let assentosAuxiliar: Assento[] = assentos;

    assentosAuxiliar = assentos.map((as, idx) => {
      if (idx === indexAssento) {
        as = newAssento;
      }

      return as ;
    });

    setAssentos([...assentosAuxiliar]);

    localStorage.setItem(keyAssentos, JSON.stringify(assentos));

    setOpenDialog(false);
  }

  return (
    <div>
      <Header />
      <main>
        <div className="onibus">
          {assentos &&
            assentos
              .sort((a, b) => (a.nro > b.nro ? 1 : -1))
              .map((assento) => {
                return (
                  <div className="assento">
                    <button
                      className="button-assento"
                      disabled={assento.reservado}
                      onClick={() => reservarAssento(assento)}
                    >
                      {assento.nro}
                    </button>
                  </div>
                );
              })}
        </div>
      </main>

      <Dialog open={openDialog} fullWidth maxWidth="sm">
        <DialogTitle>Reservar assento {assento.nro}?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Confirma reserva do assento {assento.nro}?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            size="medium"
            onClick={() => setOpenDialog(false)}
          >
            Cancelar
          </Button>

          <Button
            color="primary"
            variant="contained"
            size="medium"
            onClick={() => confirmaReserva(assento)}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;