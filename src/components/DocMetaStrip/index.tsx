import React, {type ReactNode} from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import clsx from 'clsx';
import type {BibliotecaDocFrontMatter} from '@site/src/types/bibliotecaFrontMatter';
import styles from './styles.module.css';

const NIVEL_LABEL: Record<string, string> = {
  basico: 'Básico',
  intermedio: 'Intermedio',
  avanzado: 'Avanzado',
};

const ESTADO_LABEL: Record<string, string> = {
  estable: 'Estable',
  en_revision: 'En revisión',
  borrador: 'Borrador',
};

const TYPE_LABEL: Record<string, string> = {
  concepto: 'Concepto',
  guia: 'Guía',
  marco_trabajo: 'Marco de trabajo',
  paradigma: 'Paradigma',
  practica_agil: 'Práctica ágil',
  metodologia: 'Metodología',
  arquitectura: 'Arquitectura',
  herramienta: 'Herramienta',
};

function formatType(raw: string): string {
  return TYPE_LABEL[raw] ?? raw.replace(/_/g, ' ');
}

function Pill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}): ReactNode {
  return <span className={className}>{children}</span>;
}

export default function DocMetaStrip(): ReactNode {
  const {frontMatter: rawFrontMatter} = useDoc();
  const frontMatter = rawFrontMatter as typeof rawFrontMatter &
    BibliotecaDocFrontMatter;

  if (frontMatter.hide_doc_meta === true) {
    return null;
  }

  const type = typeof frontMatter.type === 'string' ? frontMatter.type : undefined;
  const nivel = typeof frontMatter.nivel === 'string' ? frontMatter.nivel : undefined;
  const estado = typeof frontMatter.estado === 'string' ? frontMatter.estado : undefined;
  const category =
    typeof frontMatter.category === 'string' ? frontMatter.category : undefined;
  const tags = Array.isArray(frontMatter.tags)
    ? (frontMatter.tags as unknown[]).filter((t): t is string => typeof t === 'string')
    : [];
  const topics = Array.isArray(frontMatter.topics)
    ? (frontMatter.topics as unknown[]).filter((t): t is string => typeof t === 'string')
    : [];
  const origen =
    typeof frontMatter.origen === 'string' ? frontMatter.origen : undefined;

  const hasMeta =
    type ||
    nivel ||
    estado ||
    category ||
    tags.length > 0 ||
    topics.length > 0 ||
    origen;

  if (!hasMeta) {
    return null;
  }

  const nivelClass =
    nivel === 'basico'
      ? styles.pillNivelBasico
      : nivel === 'intermedio'
        ? styles.pillNivelIntermedio
        : nivel === 'avanzado'
          ? styles.pillNivelAvanzado
          : styles.pill;

  const estadoClass =
    estado === 'estable'
      ? styles.pillEstadoEstable
      : estado === 'en_revision'
        ? styles.pillEstadoRevision
        : estado === 'borrador'
          ? styles.pillEstadoBorrador
          : styles.pill;

  return (
    <aside className={styles.strip} aria-label="Metadatos de la nota">
      <div className={styles.row}>
        {(type || category) && (
          <div className={styles.group}>
            <p className={styles.groupLabel}>Clasificación</p>
            <div className={styles.pills}>
              {type && <Pill className={styles.pill}>{formatType(type)}</Pill>}
              {category && (
                <Pill className={styles.pillMuted}>{category.replace(/_/g, ' ')}</Pill>
              )}
            </div>
          </div>
        )}

        {(nivel || estado) && (
          <div className={styles.group}>
            <p className={styles.groupLabel}>Estado</p>
            <div className={styles.pills}>
              {nivel && (
                <Pill className={clsx(nivelClass)}>
                  {NIVEL_LABEL[nivel] ?? nivel}
                </Pill>
              )}
              {estado && (
                <Pill className={clsx(estadoClass)}>
                  {ESTADO_LABEL[estado] ?? estado}
                </Pill>
              )}
            </div>
          </div>
        )}

        {topics.length > 0 && (
          <div className={styles.group}>
            <p className={styles.groupLabel}>Temas</p>
            <div className={styles.pills}>
              {topics.map((t) => (
                <Pill key={t} className={styles.pillMuted}>
                  {t.replace(/-/g, ' ')}
                </Pill>
              ))}
            </div>
          </div>
        )}

        {tags.length > 0 && (
          <div className={styles.group}>
            <p className={styles.groupLabel}>Etiquetas</p>
            <div className={styles.pills}>
              {tags.map((t) => (
                <Pill key={t} className={styles.pill}>
                  {t.replace(/-/g, ' ')}
                </Pill>
              ))}
            </div>
          </div>
        )}

        {origen && (
          <div className={styles.group}>
            <p className={styles.groupLabel}>Origen</p>
            <div className={styles.pills}>
              <Pill className={styles.pillMuted}>
                {origen.replace(/-/g, ' ')}
              </Pill>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
