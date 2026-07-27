"use client";

import { useState, type FormEvent } from "react";

const profiles = [
  "Médecin libéral",
  "Médecin hospitalier",
  "Exercice mixte",
  "Docteur Junior",
  "Interne",
];

export function BetaForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="beta-form beta-form--success" role="status">
        <span aria-hidden="true">✓</span>
        <h3>Formulaire de démonstration complété.</h3>
        <p>
          Cette maquette n’enregistre et ne transmet aucune information.
        </p>
        <button type="button" onClick={() => setSubmitted(false)}>
          Revenir au formulaire
        </button>
      </div>
    );
  }

  return (
    <form className="beta-form" onSubmit={handleSubmit}>
      <div className="beta-form__row">
        <label>
          <span>Prénom</span>
          <input name="firstName" autoComplete="given-name" required />
        </label>
        <label>
          <span>Nom</span>
          <input name="lastName" autoComplete="family-name" required />
        </label>
      </div>

      <label>
        <span>Adresse e-mail</span>
        <input name="email" type="email" autoComplete="email" required />
      </label>

      <label>
        <span>Téléphone <small>optionnel</small></span>
        <input name="phone" type="tel" autoComplete="tel" />
      </label>

      <fieldset>
        <legend>Vous êtes</legend>
        <div className="beta-form__profiles">
          {profiles.map((profile) => (
            <label key={profile}>
              <input name="profile" type="radio" value={profile} required />
              <span>{profile}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <button className="button button--light beta-form__submit" type="submit">
        Rejoindre la bêta
      </button>
      <p className="beta-form__notice">
        Maquette uniquement — aucune donnée n’est enregistrée ou transmise.
      </p>
    </form>
  );
}
