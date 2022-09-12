/* eslint-disable camelcase */
import { Stack } from "@mui/material";
import React, { useMemo, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import BreadCrumbs from "../../components/BreadCrumbs";

import Tabs from "../../components/Tabs";
import "react-dropzone-uploader/dist/styles.css";
import FormDataIndentification from "./components/FormDataIndentification";
import FormDataDocuments from "./components/FormDataDocuments";
import EmpleadosServices from "../../services/EmpleadosServices";

function EmpleadosCreateOrUpdate() {
  const [data, setData] = useState(null);
  const [step, setStep] = useState(0);
  const [info, setInfo] = useState(null);
  const { id } = useParams();

  const fechaDataEmpleadoId = useCallback(async () => {
    try {
      const response = await EmpleadosServices.getId(id);
      if (response.status === 200) {
        setData({
          id: response.data.id,
          tipo_identificacion_id: {
            label: response.data.documento.name,
            value: response.data.documento.id,
          },
          identificacion: response.data.identificacion,
          nombres: response.data.nombres,
          apellidos: response.data.apellidos,
          nivel_escolaridad_id: {
            label: response.data.escolaridad.name,
            value: response.data.escolaridad.id,
          },
          genero_id: {
            label: response.data.genero.name,
            value: response.data.genero.id,
          },
          fecha_expedicion_documento: response.data.fecha_expedicion_documento,
          email: response.data.email,
          fecha_nacimiento: response.data.fecha_nacimiento,
          ocupacion: response.data.ocupacion,
          numero_telefono: response.data.numero_telefono,
          direccion: response.data.direccion,
          soporte_documento: response.data.soporte_documento,
        });
      }
    } catch (error) {
      setInfo({
        type: "error",
        message: "se ha producido un error, por favor intentelo más tarde.",
      });
    }
  }, [id]);
  const breadCrumbs = useMemo(
    () => [
      { title: "Gestión", url: "/" },
      { title: "Crear empleado", url: "/gestion/empleados/crear" },
    ],
    []
  );
  const tabs = useMemo(
    () => [
      { title: "Información del empleado" },
      { title: "Cargue de documentos del empleado" },
    ],
    []
  );
  useEffect(() => {
    if (id) {
      fechaDataEmpleadoId();
    }
  }, [fechaDataEmpleadoId, id]);

  return (
    <Stack sx={{ margin: "0px 60px" }}>
      <BreadCrumbs items={breadCrumbs} />
      <Tabs items={tabs} step={step} />
      {step === 0 && (
        <FormDataIndentification
          data={data}
          setData={setData}
          next={() => {
            setStep(1);
          }}
        />
      )}
      {step === 1 && (
        <FormDataDocuments
          data={data}
          setData={setData}
          back={() => {
            setStep(0);
          }}
        />
      )}
    </Stack>
  );
}
export default EmpleadosCreateOrUpdate;
