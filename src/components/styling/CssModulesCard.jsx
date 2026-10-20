import React, { useState } from 'react';
import styles from './CssModulesCard.module.css';
import { Heart, Bookmark, ArrowRight, Code2 } from 'lucide-react';

export default function CssModulesCard({
  variant = 'default',
  accentColor = 'indigo',
  onAction,
}) {
  const [likes, setLikes] = useState(42);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  // Dynamically resolve module class names
  const accentClassMap = {
    indigo: styles.accentIndigo,
    emerald: styles.accentEmerald,
    rose: styles.accentRose,
    amber: styles.accentAmber,
  };

  const containerClasses = [
    styles.cardContainer,
    accentClassMap[accentColor] || styles.accentIndigo,
    variant === 'featured' ? styles.cardFeatured : '',
    variant === 'compact' ? styles.cardCompact : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      {/* Header */}
      <div className={styles.cardHeader}>
        <div className={styles.iconWrapper}>
          <Code2 size={20} />
        </div>
        <span className={styles.badge}>
          {variant === 'featured' ? '★ Featured Module' : 'CSS Modules'}
        </span>
      </div>

      {/* Body */}
      <h4 className={styles.cardTitle}>
        React Architecture Mastery
      </h4>
      <p className={styles.cardDescription}>
        Component-scoped styles with zero class name collisions. CSS Modules compiles classes into hashed identifiers.
      </p>

      {/* Stats */}
      <div className={styles.statsRow}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>12</span>
          <span className={styles.statLabel}>Lessons</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>4.9/5</span>
          <span className={styles.statLabel}>Rating</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>98%</span>
          <span className={styles.statLabel}>Score</span>
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actionsFooter}>
        <div className={styles.interactiveTools}>
          <button
            onClick={handleLike}
            className={`${styles.toolButton} ${isLiked ? styles.toolButtonActive : ''}`}
            aria-label="Like this card"
          >
            <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} />
            <span>{likes}</span>
          </button>

          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`${styles.toolButton} ${isBookmarked ? styles.toolButtonActive : ''}`}
            aria-label="Bookmark this card"
          >
            <Bookmark size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>

        <button
          onClick={() => onAction && onAction('CSS Modules Card Action')}
          className={styles.primaryButton}
        >
          <span>Explore</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
