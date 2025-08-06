import React, { useState, useEffect } from "react";
import { X, Search, Star, Film, Plus } from "lucide-react";

const IntroModal = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Animation d'entrée
    const timer = setTimeout(() => setIsVisible(true), 100);

    // Gestion
    const handleEscape = (e) => {
      if (e.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden"; // Empêche le scroll

    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      style={{
        ...styles.overlay,
        backgroundColor:
          isVisible && !isClosing ? "rgba(0, 0, 0, 0.8)" : "transparent",
        backdropFilter: isVisible && !isClosing ? "blur(8px)" : "none",
        transition: "all 0.3s ease-in-out",
      }}
      onClick={handleOverlayClick}
    >
      <div
        style={{
          ...styles.modal,
          transform:
            isVisible && !isClosing
              ? "scale(1) translateY(0)"
              : "scale(0.95) translateY(20px)",
          opacity: isVisible && !isClosing ? 1 : 0,
          transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Bouton de fermeture */}
        <button
          onClick={handleClose}
          style={styles.closeButton}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)")
          }
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
          aria-label="Fermer"
        >
          <X size={18} color="#ffffff" />
        </button>

        {/* Contenu principal */}
        <div style={styles.content}>
          {/* En-tête */}
          <div style={styles.header}>
            <div style={styles.iconContainer}>
              <span style={styles.popcornIcon}>🍿</span>
            </div>
            <h2 style={styles.title}>Bienvenue sur usePopcorn !</h2>
            <p style={styles.subtitle}>Votre compagnon cinéma personnel</p>
            <div style={styles.divider}></div>
          </div>

          {/* Description */}
          <div style={styles.description}>
            <p style={styles.descriptionText}>
              Découvrez, évaluez et suivez vos films préférés. Créez votre
              collection personnelle ! ✨
            </p>
          </div>

          {/* Fonctionnalités */}
          <div style={styles.features}>
            {[
              {
                icon: <Search size={16} color="#3b82f6" />,
                title: "Rechercher",
                desc: "Trouvez n'importe quel film",
              },
              {
                icon: <Star size={16} color="#f59e0b" />,
                title: "Noter",
                desc: "Évaluez avec des étoiles",
              },
              {
                icon: <Plus size={16} color="#10b981" />,
                title: "Collecter",
                desc: "Créez votre liste personnelle",
              },
            ].map((feature, index) => (
              <div
                key={index}
                style={styles.featureItem}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.08)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)")
                }
              >
                <div style={styles.featureIconWrapper}>{feature.icon}</div>
                <div style={styles.featureContent}>
                  <div style={styles.featureTitle}>{feature.title}</div>
                  <div style={styles.featureDesc}>{feature.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Instructions rapides */}
          <div style={styles.instructions}>
            <h3 style={styles.instructionsTitle}>Comment commencer :</h3>
            <div style={styles.instructionsList}>
              <div style={styles.instructionItem}>
                <span style={styles.instructionNumber}>1</span>
                <span style={styles.instructionText}>
                  Tapez le nom d'un film
                </span>
              </div>
              <div style={styles.instructionItem}>
                <span style={styles.instructionNumber}>2</span>
                <span style={styles.instructionText}>
                  Cliquez pour voir les détails
                </span>
              </div>
              <div style={styles.instructionItem}>
                <span style={styles.instructionNumber}>3</span>
                <span style={styles.instructionText}>
                  Notez et ajoutez à votre liste !
                </span>
              </div>
            </div>
          </div>

          {/* Bouton d'action */}
          <button
            onClick={handleClose}
            style={styles.actionButton}
            onMouseEnter={(e) => {
              e.target.style.background =
                "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)";
              e.target.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background =
                "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)";
              e.target.style.transform = "scale(1)";
            }}
            onMouseDown={(e) => (e.target.style.transform = "scale(0.98)")}
            onMouseUp={(e) => (e.target.style.transform = "scale(1.02)")}
          >
            <Film size={18} style={{ marginRight: "8px" }} />
            <span>Commencer à explorer</span>
          </button>

          {/* Note en bas */}
          <p style={styles.note}>
            Astuce : Utilisez <kbd style={styles.kbd}>Entrée</kbd> pour
            rechercher !
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
  },
  modal: {
    position: "relative",
    background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
    borderRadius: "16px",
    boxShadow:
      "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)",
    width: "100%",
    maxWidth: "420px",
    maxHeight: "90vh",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  closeButton: {
    position: "absolute",
    top: "12px",
    right: "12px",
    padding: "8px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  content: {
    padding: "20px",
    overflowY: "auto",
    maxHeight: "90vh",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  iconContainer: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "56px",
    height: "56px",
    background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
    borderRadius: "50%",
    marginBottom: "12px",
    boxShadow: "0 10px 20px -5px rgba(239, 68, 68, 0.3)",
  },
  popcornIcon: {
    fontSize: "28px",
    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
  },
  title: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: "6px",
    margin: 0,
    lineHeight: "1.2",
  },
  subtitle: {
    fontSize: "14px",
    color: "#9ca3af",
    marginBottom: "12px",
    margin: 0,
  },
  divider: {
    width: "50px",
    height: "3px",
    background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
    borderRadius: "2px",
    margin: "0 auto",
  },
  description: {
    textAlign: "center",
    marginBottom: "20px",
  },
  descriptionText: {
    color: "#d1d5db",
    lineHeight: "1.5",
    margin: 0,
    fontSize: "14px",
  },
  features: {
    marginBottom: "20px",
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    padding: "12px",
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    marginBottom: "8px",
    transition: "background-color 0.2s ease",
    cursor: "default",
    border: "1px solid rgba(255, 255, 255, 0.08)",
  },
  featureIconWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    marginRight: "12px",
    flexShrink: 0,
  },
  featureContent: {
    flex: 1,
    minWidth: 0,
  },
  featureTitle: {
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "2px",
    fontSize: "14px",
  },
  featureDesc: {
    fontSize: "12px",
    color: "#9ca3af",
    lineHeight: "1.3",
  },
  instructions: {
    marginBottom: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: "10px",
    padding: "16px",
    border: "1px solid rgba(255, 255, 255, 0.08)",
  },
  instructionsTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "12px",
    margin: "0 0 12px 0",
  },
  instructionsList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  instructionItem: {
    display: "flex",
    alignItems: "center",
    fontSize: "13px",
    color: "#d1d5db",
  },
  instructionNumber: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "20px",
    height: "20px",
    backgroundColor: "#ef4444",
    color: "white",
    borderRadius: "50%",
    fontSize: "11px",
    fontWeight: "600",
    marginRight: "10px",
    flexShrink: 0,
  },
  instructionText: {
    flex: 1,
    lineHeight: "1.3",
  },
  actionButton: {
    width: "100%",
    background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
    color: "white",
    fontWeight: "600",
    padding: "14px 20px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 8px 12px -3px rgba(239, 68, 68, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
  },
  note: {
    fontSize: "11px",
    color: "#6b7280",
    textAlign: "center",
    marginTop: "16px",
    margin: "16px 0 0 0",
    lineHeight: "1.3",
  },
  kbd: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "3px",
    padding: "2px 4px",
    fontSize: "10px",
    color: "#ffffff",
  },
};

// Media queries via JavaScript
const updateModalSize = () => {
  const modal = document.querySelector('[data-modal="intro"]');
  if (!modal) return;

  const isMobile = window.innerWidth <= 480;
  const isTablet = window.innerWidth <= 768;

  if (isMobile) {
    modal.style.maxWidth = "95vw";
    modal.style.margin = "10px";
    modal.style.borderRadius = "12px";
  } else if (isTablet) {
    modal.style.maxWidth = "90vw";
    modal.style.margin = "20px";
  }
};

// Ajouter l'écouteur de redimensionnement
if (typeof window !== "undefined") {
  window.addEventListener("resize", updateModalSize);
}

export default IntroModal;
