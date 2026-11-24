import { motion } from 'motion/react';
import { Atom, Gauge, Layers, Layout, Server, Smartphone } from 'lucide-react';
import { ServiceItem, servicesData } from '../../data/services';
import { useLanguage } from '../../hooks/useLanguage';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useTilt } from '../../hooks/useTilt';

function ServiceIcon({ name }: { name: ServiceItem['iconName'] }) {
  const cls = 'h-6 w-6 text-[#FF5A1F]';
  switch (name) {
    case 'layout':
      return <Layout className={cls} />;
    case 'server':
      return <Server className={cls} />;
    case 'atom':
      return <Atom className={cls} />;
    case 'smartphone':
      return <Smartphone className={cls} />;
    case 'layers':
      return <Layers className={cls} />;
    case 'gauge':
      return <Gauge className={cls} />;
  }
}

function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const { lang } = useLanguage();
  const prefersReduced = useReducedMotion();
  const { tiltStyle, onMouseMove, onMouseLeave } = useTilt(7);

  return (
    <motion.article
      initial={prefersReduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={tiltStyle}
      className="metallic-card group rounded-2xl p-6 sm:p-7 will-change-transform"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#181818] transition-colors group-hover:border-[#FF2B1C]/60">
          <ServiceIcon name={service.iconName} />
        </div>
        <span className="font-mono text-sm font-bold text-[#FF2B1C]/80 tabular-nums">
          {service.number}
        </span>
      </div>

      <h3 className="mt-5 font-display text-lg font-bold text-white transition-colors group-hover:text-[#FF7A24]">
        {service.number}. {service.title[lang]}
      </h3>
      <p className="mt-2.5 text-sm leading-relaxed text-[#A3A3A3]">
        {service.description[lang]}
      </p>
    </motion.article>
  );
}

export function ServicesSection() {
  const { t } = useLanguage();
  const prefersReduced = useReducedMotion();

  return (
    <section id="services" className="relative bg-[#080808] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <p className="font-mono text-xs font-medium tracking-[0.2em] text-[#FF5A1F]">
            {t.services.kicker}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white [text-wrap:balance] sm:text-4xl lg:text-5xl">
            {t.services.title}
          </h2>
          <p className="mt-3 max-w-2xl text-base text-[#A3A3A3]">{t.services.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service, idx) => (
            <ServiceCard key={service.id} service={service} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
