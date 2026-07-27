"use client";

import { useState, type FormEvent } from "react";
import { Shield } from "lucide-react";

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
        <h3>Bienvenue dans l’aventure.</h3>
        <p>
          Nous reviendrons vers vous avec les prochaines étapes de la bêta.
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
          <input
            name="firstName"
            autoComplete="given-name"
            placeholder="Jean"
            required
          />
        </label>
        <label>
          <span>Nom</span>
          <input
            name="lastName"
            autoComplete="family-name"
            placeholder="Dupont"
            required
          />
        </label>
      </div>

      <label>
        <span>Adresse e-mail</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="jean.dupont@email.com"
          required
        />
      </label>

      <label>
        <span>Téléphone <small>optionnel</small></span>
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="06 12 34 56 78"
        />
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
      <p className="beta-form__privacy">
        <Shield size={12} aria-hidden="true" />
        Vos données sont protégées. Aucun spam.
      </p>
    </form>
  );
}
