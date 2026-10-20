import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Heart, Bookmark, ArrowRight, Paintbrush } from 'lucide-react';

// Color definitions used within styled components
const ACCENT_COLORS = {
  indigo: {
    primary: '#4f46e5',
    hover: '#4338ca',
    bg: '#eef2ff',
  },
  emerald: {
    primary: '#10b981',
    hover: '#059669',
    bg: '#ecfdf5',
  },
  rose: {
    primary: '#f43f5e',
    hover: '#e11d48',
    bg: '#fff1f2',
  },
  amber: {
    primary: '#f59e0b',
    hover: '#d97706',
    bg: '#fffbeb',
  },
};

// 1. Dynamic Card Container with transient props ($variant, $accentColor)
const CardContainer = styled.div`
  background-color: #ffffff;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  padding: ${(props) => (props.$variant === 'compact' ? '1rem' : '1.5rem')};
  position: relative;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);

  /* Dynamic Accent Border from props */
  border-top: 4px solid
    ${(props) =>
      ACCENT_COLORS[props.$accentColor]?.primary || ACCENT_COLORS.indigo.primary};

  /* Featured variant styling based on props */
  ${(props) =>
    props.$variant === 'featured' &&
    css`
      background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
      border-color: #818cf8;
      box-shadow: 0 8px 20px -4px rgba(99, 102, 241, 0.15);
    `}

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const IconWrapper = styled.div`
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;

  /* Dynamic color from props */
  background-color: ${(props) =>
    ACCENT_COLORS[props.$accentColor]?.bg || ACCENT_COLORS.indigo.bg};
  color: ${(props) =>
    ACCENT_COLORS[props.$accentColor]?.primary || ACCENT_COLORS.indigo.primary};

  &:hover {
    transform: scale(1.05);
  }
`;

const Badge = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  background-color: #f1f5f9;
  color: #475569;
  border: 1px solid #e2e8f0;
`;

const Title = styled.h4`
  font-size: 1.125rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.5rem;
  line-height: 1.35;
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 1.25rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  background-color: #f8fafc;
  border-radius: 0.75rem;
  padding: 0.75rem;
  margin-bottom: 1.25rem;
  border: 1px solid #f1f5f9;
  text-align: center;
`;

const StatItem = styled.div``;

const StatValue = styled.span`
  display: block;
  font-size: 0.875rem;
  font-weight: 700;
  color: #1e293b;
  font-family: 'JetBrains Mono', monospace;
`;

const StatLabel = styled.span`
  display: block;
  font-size: 0.6875rem;
  color: #64748b;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.025em;
  margin-top: 0.125rem;
`;

const ActionsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
`;

const ToolButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ToolButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.625rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.15s ease;

  background-color: ${(props) => (props.$active ? '#fee2e2' : '#f1f5f9')};
  color: ${(props) => (props.$active ? '#ef4444' : '#475569')};
  border-color: ${(props) => (props.$active ? '#fecaca' : 'transparent')};

  &:hover {
    background-color: ${(props) => (props.$active ? '#fecaca' : '#e2e8f0')};
  }
`;

const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  border-radius: 0.625rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #ffffff;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  /* Dynamic color from props */
  background-color: ${(props) =>
    ACCENT_COLORS[props.$accentColor]?.primary || ACCENT_COLORS.indigo.primary};

  &:hover {
    background-color: ${(props) =>
      ACCENT_COLORS[props.$accentColor]?.hover || ACCENT_COLORS.indigo.hover};
  }
`;

export default function StyledComponentsCard({
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

  return (
    <CardContainer $variant={variant} $accentColor={accentColor}>
      {/* Header */}
      <HeaderRow>
        <IconWrapper $accentColor={accentColor}>
          <Paintbrush size={20} />
        </IconWrapper>
        <Badge>
          {variant === 'featured' ? '★ Featured Module' : 'styled-components'}
        </Badge>
      </HeaderRow>

      {/* Body */}
      <Title>React Architecture Mastery</Title>
      <Description>
        CSS-in-JS using tagged template literals. Styles are dynamic, encapsulated within React components, and react to props.
      </Description>

      {/* Stats */}
      <StatsGrid>
        <StatItem>
          <StatValue>12</StatValue>
          <StatLabel>Lessons</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>4.9/5</StatValue>
          <StatLabel>Rating</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>98%</StatValue>
          <StatLabel>Score</StatLabel>
        </StatItem>
      </StatsGrid>

      {/* Actions */}
      <ActionsRow>
        <ToolButtonGroup>
          <ToolButton
            onClick={handleLike}
            $active={isLiked}
            aria-label="Like this card"
          >
            <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} />
            <span>{likes}</span>
          </ToolButton>

          <ToolButton
            onClick={() => setIsBookmarked(!isBookmarked)}
            $active={isBookmarked}
            aria-label="Bookmark this card"
          >
            <Bookmark size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
          </ToolButton>
        </ToolButtonGroup>

        <PrimaryButton
          $accentColor={accentColor}
          onClick={() => onAction && onAction('styled-components Card Action')}
        >
          <span>Explore</span>
          <ArrowRight size={14} />
        </PrimaryButton>
      </ActionsRow>
    </CardContainer>
  );
}
