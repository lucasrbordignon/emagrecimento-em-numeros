import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Calculator,
  Ruler,
  Scale,
  Flame,
  ShieldCheck,
  Lock,
  Mail,
  BookOpen,
  ArrowRight,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  Smartphone,
  RefreshCw,
  FileText,
  HeartPulse,
  MessageCircle,
  X,
  CreditCard,
  Zap,
  Award,
  ChevronRight,
  HelpCircle,
  Dumbbell,
  Utensils
} from 'lucide-react';

/* ==========================================================================
   CONFIGURAÇÃO DA LANDING PAGE
   Altere aqui os links de pagamento, preços, WhatsApp e dados de contato.
   ========================================================================== */
export const CONFIG = {
  // Preços
  PRECO_COMBO: '29,90', // Preço da série completa (4 partes)
  PRECO_DE: '39,96',     // Preço original somado (4 x R$ 9,99)
  PRECO_AVULSO: '9,99',  // Preço de cada parte avulsa

  // Links de Checkout (Hotmart, Kiwify, Eduzz, Braip, Monetizze, etc.)
  // Dica: parâmetros UTM serão repassados automaticamente para todos os links!
  LINK_CHECKOUT_COMBO: 'https://pay.kiwify.com.br/XbvbqOY',
  LINK_CHECKOUT_P1: 'https://pay.kiwify.com.br/mLPrN9A',
  LINK_CHECKOUT_P2: 'https://pay.kiwify.com.br/i3FIYLf',
  LINK_CHECKOUT_P3: 'https://pay.kiwify.com.br/FUNhQOi',
  LINK_CHECKOUT_P4: 'https://pay.kiwify.com.br/P27580s',

  // WhatsApp de Suporte (formato internacional: DDI + DDD + Número, sem traços ou espaços)
  NUMERO_WHATSAPP: '5515991360221',
  MENSAGEM_WHATSAPP: 'Olá! Estou na página do Emagrecimento em Números e gostaria de tirar uma dúvida.',

  // Flags opcionais
  MOSTRAR_PRECO_LANCAMENTO: false, // Mude para true quando for campanha de lançamento real
  MOSTRAR_DEPOIMENTOS: false,      // Mude para true quando tiver depoimentos e fotos reais

  // Dados do Negócio (para rodapé e transparência legal)
  NOME_EMPRESA_OU_AUTOR: 'Emagrecimento em Números Produções Digitais',
  CNPJ_OU_CPF: '00.000.000/0001-00',
  EMAIL_SUPORTE: 'contato@emagrecimentoemnumeros.com.br',
  CIDADE_ESTADO: 'São Paulo - SP',

  // Configuração de Pixels e Analytics (deixe vazio se não usar)
  // Coloque os IDs aqui para ativação imediata
  PIXEL_META_ID: '',      // Ex: '123456789012345'
  PIXEL_TIKTOK_ID: '',    // Ex: 'C1234567890ABCDEF'
  GA4_MEASUREMENT_ID: '', // Ex: 'G-XXXXXXXXXX'

  // Capas personalizadas (se tiver imagem real hospedada, coloque o caminho ou URL aqui)
  // Deixe vazio ('') para usar os mockups vetoriais 3D em alta fidelidade idênticos ao design oficial.
  COVERS: {
    parte1: '',
    parte2: '',
    parte3: '',
    parte4: ''
  }
};

/* ==========================================================================
   UTILITÁRIOS: UTM Tracking & Analytics
   ========================================================================== */
function buildCheckoutUrl(baseUrl: string): string {
  if (typeof window === 'undefined' || !baseUrl) return baseUrl;
  try {
    const currentSearch = window.location.search;
    if (!currentSearch) return baseUrl;

    const url = new URL(baseUrl, window.location.href);
    const currentParams = new URLSearchParams(currentSearch);

    currentParams.forEach((value, key) => {
      // Repassa parâmetros sem sobrescrever os já definidos no link base
      if (!url.searchParams.has(key)) {
        url.searchParams.set(key, value);
      }
    });

    return url.toString();
  } catch {
    return baseUrl;
  }
}

function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
  try {
    // Meta Pixel (Facebook)
    // @ts-expect-error window.fbq can exist
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      // @ts-expect-error window.fbq call
      window.fbq('track', eventName, params);
    }

    // TikTok Pixel
    // @ts-expect-error window.ttq can exist
    if (typeof window !== 'undefined' && window.ttq && typeof window.ttq.track === 'function') {
      // @ts-expect-error window.ttq call
      window.ttq.track(eventName, params);
    }

    // Google Analytics 4
    // @ts-expect-error window.gtag can exist
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      // @ts-expect-error window.gtag call
      window.gtag('event', eventName, params);
    }
  } catch (err) {
    console.debug('Analytics error:', err);
  }
}

/* ==========================================================================
   COMPONENTE: Mockup 3D de Livro Digital
   Renderiza a capa com estética oficial da série "Emagrecimento em Números"
   ========================================================================== */
interface BookCoverProps {
  partNumber: 1 | 2 | 3 | 4;
  title: string;
  subtitle: string;
  tags: string;
  customImg?: string;
  className?: string;
  rotate?: boolean;
}

const BookCover: React.FC<BookCoverProps> = ({
  partNumber,
  title,
  subtitle,
  tags,
  customImg,
  className = '',
  rotate = false
}) => {
  return (
    <div
      className={`relative select-none transition-transform duration-300 ${
        rotate ? 'hover:-translate-y-1.5 hover:rotate-1' : ''
      } ${className}`}
    >
      {/* Container com proporção de capa 3:4 e relevo de livro */}
      <div className="relative aspect-[3/3.75] w-full max-w-[280px] mx-auto rounded-r-xl rounded-l-sm overflow-hidden bg-gradient-to-br from-[#0c532b] via-[#0e6033] to-[#083b1f] text-white shadow-2xl book-shadow border-t border-r border-emerald-400/20">
        {/* Efeito de lombada e vinco do livro à esquerda */}
        <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/40 via-black/10 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 left-3.5 w-[1px] bg-white/20 z-20 pointer-events-none" />

        {/* Brilho e reflexo de capa premium */}
        <div className="absolute inset-0 book-spine-highlight z-10 pointer-events-none" />

        {customImg ? (
          <img
            src={customImg}
            alt={`Capa Parte ${partNumber}: ${title}`}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover relative z-0"
          />
        ) : (
          <div className="relative z-0 h-full flex flex-col justify-between p-4 pl-6 text-center">
            {/* Topo: Pílula Laranja da Parte */}
            <div className="pt-1">
              <span className="inline-block bg-[#f97316] text-white font-extrabold text-[10px] sm:text-xs tracking-wider uppercase px-3 py-1 rounded-full shadow-md border border-orange-300/30">
                PARTE {partNumber} DE 4
              </span>
            </div>

            {/* Centro: Título Principal e Subtítulo */}
            <div className="my-auto py-2">
              <p className="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-white leading-none drop-shadow-sm font-heading">
                EMAGRECIMENTO
              </p>
              <div className="inline-block relative my-1">
                <p className="text-xl sm:text-2xl md:text-3xl font-black text-[#facc15] tracking-tight leading-none drop-shadow font-heading">
                  EM NÚMEROS
                </p>
                <div className="h-0.5 w-12 bg-white/70 mx-auto mt-1 rounded-full" />
              </div>

              <div className="mt-2 sm:mt-3 px-1">
                <p className="text-xs sm:text-sm font-bold text-white leading-snug drop-shadow-sm font-heading">
                  {title}
                </p>
                <p className="text-[10px] sm:text-[11px] text-emerald-100 font-medium mt-0.5 tracking-tight">
                  {tags}
                </p>
              </div>
            </div>

            {/* Fundo da Capa: Fita Métrica e Barra Laranja */}
            <div className="w-[calc(100%+2rem)] -ml-6 -mb-4 overflow-hidden">
              {/* Fita Métrica Amarela com marcações de régua */}
              <div className="h-5 bg-[#facc15] relative flex items-center justify-between px-1 border-y border-amber-600/30">
                <div className="w-full h-full flex justify-between items-end pb-0.5">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-[1px] bg-[#78350f] ${i % 5 === 0 ? 'h-3.5' : 'h-2'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Barra Laranja Inferior */}
              <div className="bg-[#f97316] text-white py-1.5 px-2 text-[9px] sm:text-[10px] font-bold tracking-tight text-center leading-tight">
                Dieta e treino em casa • Sem academia
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sombra 3D projetada na base */}
      <div className="w-3/4 h-3 bg-black/25 mx-auto rounded-full blur-md -mt-1 transform scale-y-75" />
    </div>
  );
};

/* ==========================================================================
   COMPONENTE: Banner 3D do Combo (Os 4 e-books juntos)
   ========================================================================== */
const ComboMockupStack: React.FC = () => {
  return (
    <div className="relative py-4 px-2 max-w-md mx-auto">
      {/* Efeito de halo/luz atrás dos livros */}
      <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-3xl -z-10 transform scale-90" />

      <div className="grid grid-cols-2 gap-2 sm:gap-3 items-center justify-center">
        <div className="transform -rotate-2 hover:rotate-0 transition-transform">
          <BookCover
            partNumber={1}
            title="Seu Diagnóstico Corporal"
            subtitle="IMC · Gordura · Medidas"
            tags="IMC · Gordura · Medidas"
            customImg={CONFIG.COVERS.parte1}
          />
        </div>
        <div className="transform rotate-2 hover:rotate-0 transition-transform">
          <BookCover
            partNumber={2}
            title="Sua Dieta em Números"
            subtitle="Calorias · Macros · Metas"
            tags="Calorias · Macros · Metas"
            customImg={CONFIG.COVERS.parte2}
          />
        </div>
        <div className="transform -rotate-1 hover:rotate-0 transition-transform">
          <BookCover
            partNumber={3}
            title="Seu Prato e Seu Treino em Casa"
            subtitle="Cardápio · Treino sem academia"
            tags="Cardápio · Treino sem academia"
            customImg={CONFIG.COVERS.parte3}
          />
        </div>
        <div className="transform rotate-1 hover:rotate-0 transition-transform">
          <BookCover
            partNumber={4}
            title="Acompanhe, Ajuste e Conquiste"
            subtitle="Ajustes · Platôs · 12 semanas"
            tags="Ajustes · Platôs · 12 semanas"
            customImg={CONFIG.COVERS.parte4}
          />
        </div>
      </div>

      {/* Selo flutuante de formato 100% digital */}
      <div className="mt-3 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-100/90 py-1.5 px-3 rounded-full border border-emerald-300 w-fit mx-auto shadow-sm">
        <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
        <span>4 PDFs Digitais para ler no celular, tablet ou computador</span>
      </div>
    </div>
  );
};

/* ==========================================================================
   APP PRINCIPAL
   ========================================================================== */
export default function App() {
  // Estado da barra fixa móvel no rodapé
  const [showStickyBar, setShowStickyBar] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Estado da Calculadora Interativa
  const [calcGender, setCalcGender] = useState<'fem' | 'masc'>('fem');
  const [calcAge, setCalcAge] = useState<string>('30');
  const [calcWeight, setCalcWeight] = useState<string>('70');
  const [calcHeight, setCalcHeight] = useState<string>('165');
  const [calcActivity, setCalcActivity] = useState<string>('1.2'); // Sedentário padrão
  const [calcResult, setCalcResult] = useState<{
    tmb: number;
    get: number;
    imc: number;
    imcCategoria: string;
  } | null>(null);

  // Estado do Accordion de Perguntas Frequentes
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Estados de Modais Legais (Termos, Privacidade, Contato)
  const [legalModal, setLegalModal] = useState<'termos' | 'privacidade' | 'contato' | null>(null);

  // Efeito de rolagem para ativar a barra fixa do rodapé
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const heroBottom = heroRef.current.getBoundingClientRect().bottom;
      // Aparece logo que o visitante passa da primeira dobra
      setShowStickyBar(heroBottom < 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Disparar ViewContent no carregamento
  useEffect(() => {
    trackEvent('ViewContent', {
      content_name: 'Landing Page Emagrecimento em Números',
      content_category: 'E-books / Saúde e Fitness',
      value: 29.90,
      currency: 'BRL'
    });
  }, []);

  // Cálculo da Calculadora
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const weight = parseFloat(calcWeight.replace(',', '.'));
    const height = parseFloat(calcHeight.replace(',', '.'));
    const age = parseFloat(calcAge.replace(',', '.'));
    const factor = parseFloat(calcActivity);

    if (isNaN(weight) || isNaN(height) || isNaN(age) || weight <= 0 || height <= 0 || age <= 0) {
      return;
    }

    // Fórmulas exatas do briefing:
    // Homem = 10×peso + 6,25×altura − 5×idade + 5
    // Mulher = 10×peso + 6,25×altura − 5×idade − 161
    let tmb = 0;
    if (calcGender === 'masc') {
      tmb = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      tmb = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // GET = TMB × fator de atividade
    const get = tmb * factor;

    // IMC = peso ÷ (altura em metros)²
    const heightInMeters = height / 100;
    const imc = weight / (heightInMeters * heightInMeters);

    let imcCategoria = 'Normal';
    if (imc < 18.5) imcCategoria = 'Abaixo do peso';
    else if (imc < 25) imcCategoria = 'Peso normal';
    else if (imc < 30) imcCategoria = 'Sobrepeso';
    else imcCategoria = 'Obesidade';

    setCalcResult({
      tmb: Math.round(tmb),
      get: Math.round(get),
      imc: parseFloat(imc.toFixed(1)),
      imcCategoria
    });

    // Disparar evento de Lead/CalculatorUsed nos pixels configurados
    trackEvent('Lead', {
      content_name: 'Calculadora de Gasto Calórico',
      gender: calcGender,
      tmb: Math.round(tmb),
      get: Math.round(get),
      imc: parseFloat(imc.toFixed(1))
    });
  };

  // Scroll suave até a seção de oferta
  const scrollToOffer = () => {
    const el = document.getElementById('oferta');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Manipulador de clique no botão de compra com analytics
  const handleBuyClick = (productName: string, price: string, url: string) => {
    trackEvent('InitiateCheckout', {
      content_name: productName,
      value: parseFloat(price.replace(',', '.')),
      currency: 'BRL'
    });
    window.location.href = buildCheckoutUrl(url);
  };

  // Perguntas Frequentes
  const faqs = useMemo(
    () => [
      {
        q: 'Preciso de academia?',
        a: 'Não. Todos os treinos são feitos em casa com peso do corpo e itens que você já tem.'
      },
      {
        q: 'Preciso entender de matemática?',
        a: 'Não. Só usa a calculadora do celular e tem exemplo resolvido para cada conta.'
      },
      {
        q: 'Como recebo?',
        a: 'Por e-mail, logo após a confirmação do pagamento, em PDF para ler no celular ou computador.'
      },
      {
        q: 'Serve para homens e mulheres?',
        a: 'Sim, as fórmulas têm versões para os dois.'
      },
      {
        q: 'Posso comprar só uma parte?',
        a: 'Pode, mas a série completa dá o caminho inteiro do diagnóstico ao ajuste, com melhor preço.'
      },
      {
        q: 'Substitui nutricionista?',
        a: 'Não. É um guia educativo. Em caso de doenças ou condições especiais, procure um profissional.'
      },
      {
        q: 'E se eu não gostar?',
        a: 'Você tem 7 dias de garantia incondicional. Se não gostar, pode pedir o reembolso sem nenhuma complicação.'
      },
      {
        q: 'Tem promessa de resultado?',
        a: 'Não prometemos prazos mágicos. Ensinamos um método seguro e mensurável, e o resultado depende da sua constância.'
      }
    ],
    []
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 md:pb-0 selection:bg-emerald-500 selection:text-white">
      {/* ====================================================================
          1) BARRA DE TOPO
          "Método de autocálculo · Dieta e treino em casa · Sem academia"
          ==================================================================== */}
      <header className="sticky top-0 z-40 bg-[#0e6033] text-white shadow-md border-b border-emerald-800">
        <div className="max-w-4xl mx-auto px-4 py-2.5 text-center flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span>Método de autocálculo · Dieta e treino em casa · Sem academia</span>
        </div>
      </header>

      {/* ====================================================================
          2) HERO (PRIMEIRA DOBRA)
          ==================================================================== */}
      <section
        ref={heroRef}
        className="relative bg-gradient-to-b from-[#f0fdf4] via-white to-slate-50 pt-8 pb-14 px-4 sm:px-6 overflow-hidden"
      >
        <div className="max-w-3xl mx-auto text-center">
          {/* Tag de lançamento opcional */}
          {CONFIG.MOSTRAR_PRECO_LANCAMENTO && (
            <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full mb-4 border border-amber-300">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>Condição Especial de Lançamento</span>
            </div>
          )}

          {/* Título Principal */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-slate-900 leading-[1.18] tracking-tight font-heading">
            Pare de adivinhar sua dieta.{' '}
            <span className="text-[#0e6033] inline-block">
              Descubra EXATAMENTE quanto comer e como treinar em casa para emagrecer.
            </span>
          </h1>

          {/* Subtítulo */}
          <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">
            Com apenas a balança, uma fita métrica e a calculadora do celular, você calcula suas calorias,
            seus macros e monta seu treino, sem academia e sem pagar consulta.
          </p>

          {/* 3 Selos de Prova Rápida */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium text-slate-700">
            <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              4 guias práticos
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Exemplos resolvidos passo a passo
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Garantia de 7 dias
            </span>
          </div>

          {/* Mockup dos 4 E-books na Hero */}
          <div className="mt-8 mb-6">
            <ComboMockupStack />
          </div>

          {/* Botão de Ação CTA Principal */}
          <div className="mt-6 max-w-md mx-auto">
            <button
              onClick={scrollToOffer}
              className="w-full py-4 px-6 bg-[#f97316] hover:bg-[#ea580c] active:bg-[#c2410c] text-white font-extrabold text-lg sm:text-xl rounded-xl shadow-lg animate-cta-pulse transition-all flex items-center justify-center gap-2 cursor-pointer font-heading"
            >
              <span>QUERO MEU PLANO EM NÚMEROS</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Microcopy abaixo do CTA */}
            <p className="mt-3 text-xs sm:text-sm text-slate-500 font-medium">
              Acesso imediato no e-mail · Pagamento seguro · A partir de R$ 9,99
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3) IDENTIFICAÇÃO DA DOR
          "Se você já passou por isso, esta página é para você"
          ==================================================================== */}
      <section className="py-14 px-4 sm:px-6 bg-white border-t border-slate-200/80">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 text-center font-heading">
            Se você já passou por isso, esta página é para você
          </h2>

          <div className="mt-8 space-y-3.5">
            {[
              'Já tentou dieta da moda, perdeu uns quilos e recuperou tudo',
              'Não sabe quantas calorias precisa comer de verdade',
              'Copia treino e dieta da internet que não foram feitos para o seu corpo',
              'Não tem dinheiro ou tempo para academia e nutricionista todo mês',
              'Se pesa todo dia e desanima com a balança oscilando'
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-200/80 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-4 h-4 stroke-[2.5]" />
                </div>
                <p className="text-sm sm:text-base text-slate-800 font-medium leading-snug">
                  {item}
                </p>
              </div>
            ))}
          </div>

          {/* Frase de Virada */}
          <div className="mt-8 p-5 sm:p-6 bg-emerald-50 border-l-4 border-emerald-600 rounded-r-xl shadow-xs text-center">
            <p className="text-base sm:text-lg font-bold text-emerald-950 leading-snug">
              "O problema nunca foi falta de força de vontade.{' '}
              <span className="text-emerald-700 underline decoration-amber-400 decoration-4 underline-offset-4">
                Foi falta de números.
              </span>
              "
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4) A SOLUÇÃO
          "Emagrecer é matemática simples quando você sabe onde está e para onde vai"
          ==================================================================== */}
      <section className="py-14 px-4 sm:px-6 bg-gradient-to-b from-[#f0fdf4] to-white border-t border-emerald-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 font-heading">
            Emagrecer é matemática simples quando você sabe onde está e para onde vai
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl mx-auto">
            Cada corpo gasta uma quantidade diferente de energia. Quando você mede, calcula e ajusta, deixa de
            adivinhar e passa a ter um plano feito para o SEU corpo. Em 4 guias diretos, você aprende o caminho
            completo.
          </p>

          {/* Linha do tempo em 4 etapas */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {[
              {
                step: '1',
                title: 'MEDIR',
                desc: 'Tire medidas simples com a fita métrica e descubra seu ponto de partida real.',
                icon: Ruler
              },
              {
                step: '2',
                title: 'CALCULAR',
                desc: 'Defina sua taxa metabólica, suas calorias ideais e a divisão exata de macros.',
                icon: Calculator
              },
              {
                step: '3',
                title: 'COMER E TREINAR',
                desc: 'Monte seu prato brasileiro sem complicação e faça treinos prontos em casa.',
                icon: Utensils
              },
              {
                step: '4',
                title: 'AJUSTAR',
                desc: 'Monitore o progresso a cada 2 semanas e vença platôs sem passar fome.',
                icon: RefreshCw
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="relative p-5 bg-white rounded-xl border border-emerald-200/80 shadow-xs hover:border-emerald-400 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-8 h-8 rounded-full bg-[#0e6033] text-white text-xs font-black flex items-center justify-center font-heading">
                        {item.step}
                      </span>
                      <Icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h3 className="font-extrabold text-base text-slate-900 tracking-wide font-heading">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  {index < 3 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <ChevronRight className="w-5 h-5 text-emerald-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA intermediário */}
          <div className="mt-10">
            <button
              onClick={scrollToOffer}
              className="py-3.5 px-6 bg-[#f97316] hover:bg-[#ea580c] active:bg-[#c2410c] text-white font-extrabold text-base rounded-xl shadow-md transition-all inline-flex items-center gap-2 cursor-pointer font-heading"
            >
              <span>QUERO APRENDER O MÉTODO COMPLETO</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5) CALCULADORA INTERATIVA GRATUITA
          Isca de engajamento com cálculos em JavaScript
          ==================================================================== */}
      <section
        id="calculadora"
        className="py-14 px-4 sm:px-6 bg-slate-900 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-radial from-emerald-950 via-slate-900 to-slate-950 pointer-events-none opacity-80" />

        <div className="max-w-xl mx-auto relative z-10">
          <div className="text-center">
            <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/30 uppercase tracking-wider mb-2">
              <Calculator className="w-3.5 h-3.5" />
              Teste Grátis Rápido
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white font-heading">
              Faça agora um teste grátis: descubra seu gasto calórico diário
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300">
              Preencha os campos abaixo com os números do seu corpo.
            </p>
          </div>

          {/* Formulário da Calculadora */}
          <form
            onSubmit={handleCalculate}
            className="mt-8 bg-slate-800/90 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-slate-700 shadow-xl"
          >
            {/* Sexo */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wide">
                Sexo Biológico (para fórmulas hormonais e metabólicas)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCalcGender('fem')}
                  className={`py-2.5 px-3 rounded-lg text-sm font-semibold border transition-all cursor-pointer ${
                    calcGender === 'fem'
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                      : 'bg-slate-700/60 text-slate-300 border-slate-600 hover:bg-slate-700'
                  }`}
                >
                  Feminino
                </button>
                <button
                  type="button"
                  onClick={() => setCalcGender('masc')}
                  className={`py-2.5 px-3 rounded-lg text-sm font-semibold border transition-all cursor-pointer ${
                    calcGender === 'masc'
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                      : 'bg-slate-700/60 text-slate-300 border-slate-600 hover:bg-slate-700'
                  }`}
                >
                  Masculino
                </button>
              </div>
            </div>

            {/* Idade, Peso e Altura */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Idade (anos)
                </label>
                <input
                  type="number"
                  min="15"
                  max="100"
                  value={calcAge}
                  onChange={(e) => setCalcAge(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-emerald-400 tabular-nums"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Peso (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="30"
                  max="250"
                  value={calcWeight}
                  onChange={(e) => setCalcWeight(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-emerald-400 tabular-nums"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Altura (cm)
                </label>
                <input
                  type="number"
                  min="100"
                  max="230"
                  value={calcHeight}
                  onChange={(e) => setCalcHeight(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-emerald-400 tabular-nums"
                  required
                />
              </div>
            </div>

            {/* Nível de Atividade */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wide">
                Nível de Atividade Diária
              </label>
              <select
                value={calcActivity}
                onChange={(e) => setCalcActivity(e.target.value)}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg p-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-400 cursor-pointer"
              >
                <option value="1.2">Sedentário (trabalho sentado, pouco ou nenhum exercício) · 1.2</option>
                <option value="1.375">Leve (exercício leve 1 a 3 dias por semana) · 1.375</option>
                <option value="1.55">Moderado (exercício moderado 3 a 5 dias por semana) · 1.55</option>
                <option value="1.725">Intenso (exercício pesado 6 a 7 dias por semana) · 1.725</option>
                <option value="1.9">Extremo (trabalho físico pesado ou treino 2x ao dia) · 1.9</option>
              </select>
            </div>

            {/* Botão Calcular */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-black text-base rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer font-heading"
            >
              <Flame className="w-5 h-5 text-amber-900 fill-amber-900" />
              <span>CALCULAR MEUS NÚMEROS AGORA</span>
            </button>
          </form>

          {/* Resultado Animado */}
          {calcResult && (
            <div className="mt-6 p-5 sm:p-6 bg-gradient-to-br from-emerald-950/90 to-slate-900 rounded-2xl border-2 border-emerald-500 shadow-2xl animate-in fade-in zoom-in-95 duration-300 text-center">
              <p className="text-xs uppercase tracking-wider text-emerald-400 font-bold">
                Resultado do Seu Corpo
              </p>

              <div className="mt-2 text-2xl sm:text-3xl font-black text-white font-heading">
                Seu corpo gasta cerca de{' '}
                <span className="text-[#facc15] underline decoration-amber-500 underline-offset-4 tabular-nums">
                  {calcResult.get.toLocaleString('pt-BR')} kcal
                </span>{' '}
                por dia
              </div>

              <div className="mt-3 inline-flex items-center gap-2 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700 text-xs sm:text-sm text-slate-200">
                <span>
                  Seu IMC é <strong className="text-white tabular-nums">{calcResult.imc}</strong>
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-emerald-300 font-semibold">{calcResult.imcCategoria}</span>
              </div>

              <div className="mt-4 pt-4 border-t border-emerald-900/60 text-xs text-slate-300 leading-relaxed text-left sm:text-center">
                <p>
                  Sua Taxa Metabólica Basal (queima em repouso absoluto) é de cerca de{' '}
                  <strong className="text-white tabular-nums">{calcResult.tmb} kcal</strong>.
                </p>
                <p className="mt-2 text-emerald-200 font-medium">
                  Este é só o começo. Na <strong>Parte 2</strong> você descobre quantas calorias comer para o seu
                  objetivo, e quanto de proteína, carboidrato e gordura.
                </p>
              </div>

              <div className="mt-5">
                <button
                  onClick={scrollToOffer}
                  className="w-full py-3 px-4 bg-[#f97316] hover:bg-[#ea580c] active:bg-[#c2410c] text-white font-black text-sm sm:text-base rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer font-heading"
                >
                  <span>QUERO CALCULAR MINHA DIETA COMPLETA</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="mt-3 text-[11px] text-slate-400">
                *Valores estimados, não substituem avaliação profissional.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ====================================================================
          6) O QUE VOCÊ VAI RECEBER (4 CARDS DETALHADOS)
          ==================================================================== */}
      <section className="py-14 px-4 sm:px-6 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest">
              Conteúdo Completo
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              O que você vai receber em cada um dos 4 guias
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Cada parte resolve uma etapa essencial com fichas práticas e exemplos passo a passo.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PARTE 1 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-emerald-100 text-emerald-900 font-extrabold text-xs px-2.5 py-1 rounded-md">
                    PARTE 1
                  </span>
                  <Ruler className="w-5 h-5 text-emerald-700" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  Seu Diagnóstico Corporal
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Conheça o seu ponto de partida real sem balança de bioimpedância cara.
                </p>

                <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Cálculo do IMC e seus limites práticos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Relação cintura-altura e cintura-quadril (risco metabólico)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>% de gordura corporal estimado só com a fita métrica</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Cálculo da massa magra estimada e histórico corporal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Ficha de diagnóstico para preencher e guardar</span>
                  </li>
                </ul>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span>Disponível avulso por R$ {CONFIG.PRECO_AVULSO}</span>
                <span className="font-semibold text-emerald-800">ou no Combo com desconto</span>
              </div>
            </div>

            {/* PARTE 2 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-emerald-100 text-emerald-900 font-extrabold text-xs px-2.5 py-1 rounded-md">
                    PARTE 2
                  </span>
                  <Flame className="w-5 h-5 text-emerald-700" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  Sua Dieta em Números
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Descubra suas calorias e gramas de proteína, gordura e carbo.
                </p>

                <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Taxa Metabólica Basal (TMB) exata para homens e mulheres</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Gasto Energético Diário Real (GET) pelo fator de atividade</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Meta de calorias para emagrecer com <strong>trava de segurança</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Divisão exata de macronutrientes em gramas (proteína, gordura, carbo)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Exemplos resolvidos na prática com Ana e Carlos</span>
                  </li>
                </ul>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span>Disponível avulso por R$ {CONFIG.PRECO_AVULSO}</span>
                <span className="font-semibold text-emerald-800">ou no Combo com desconto</span>
              </div>
            </div>

            {/* PARTE 3 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-emerald-100 text-emerald-900 font-extrabold text-xs px-2.5 py-1 rounded-md">
                    PARTE 3
                  </span>
                  <Dumbbell className="w-5 h-5 text-emerald-700" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  Seu Prato e Seu Treino em Casa
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Transforme os cálculos em comida no prato e treinos na sala.
                </p>

                <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Método da mão para medir porções quando não tiver balança</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Tabela prática de alimentos brasileiros do dia a dia</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Cardápio-modelo flexível (arroz, feijão, frango, ovos, legumes)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Biblioteca ilustrada de exercícios sem peso e planos prontos (A/B/C)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Estratégia simples de cardio e passos diários</span>
                  </li>
                </ul>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span>Disponível avulso por R$ {CONFIG.PRECO_AVULSO}</span>
                <span className="font-semibold text-emerald-800">ou no Combo com desconto</span>
              </div>
            </div>

            {/* PARTE 4 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-emerald-100 text-emerald-900 font-extrabold text-xs px-2.5 py-1 rounded-md">
                    PARTE 4
                  </span>
                  <RefreshCw className="w-5 h-5 text-emerald-700" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  Acompanhe, Ajuste e Conquiste
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  A regra de ouro para nunca mais estagnar e manter o resultado.
                </p>

                <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Regra de ajuste obrigatória a cada 2 semanas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Como destravar platôs sem cortar calorias perigosamente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Desmistificando os mitos que sabotam o emagrecimento</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Tabela de acompanhamento semanal para as 12 semanas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Cola rápida de fórmulas em uma página só</span>
                  </li>
                </ul>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span>Disponível avulso por R$ {CONFIG.PRECO_AVULSO}</span>
                <span className="font-semibold text-emerald-800">ou no Combo com desconto</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          7) MOSTRE POR DENTRO
          "Veja como é fácil seguir"
          ==================================================================== */}
      <section className="py-14 px-4 sm:px-6 bg-gradient-to-b from-[#f0fdf4] to-white border-t border-emerald-100">
        <div className="max-w-2xl mx-auto">
          <div className="text-center">
            <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-widest">
              Passo a Passo Resolvido
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              Veja como é fácil seguir
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Você não precisa tentar inventar nada do zero. O material traz casos reais resolvidos do início ao fim:
            </p>
          </div>

          {/* Card do Exemplo Real Resolvido de Ana */}
          <div className="mt-8 bg-white rounded-2xl border-2 border-emerald-300 p-5 sm:p-6 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#0e6033] text-white text-[11px] font-bold px-3 py-1 rounded-bl-lg">
              CASO PRÁTICO DO E-BOOK
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center font-heading text-lg">
                A
              </div>
              <div>
                <p className="font-black text-slate-900 text-base font-heading">
                  Ana, 32 anos
                </p>
                <p className="text-xs text-slate-500">
                  78 kg · 165 cm · Treinando em casa
                </p>
              </div>
            </div>

            {/* O fluxo de números de Ana */}
            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-600">1. Gasto Diário Total (GET):</span>
                <span className="font-bold text-slate-900 tabular-nums">cerca de 2.049 kcal</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-600">2. Meta Segura de Emagrecimento:</span>
                <span className="font-bold text-emerald-700 tabular-nums">cerca de 1.640 kcal</span>
              </div>
              <div className="pt-1">
                <span className="text-slate-600 block mb-2 font-medium">
                  3. Divisão de Macronutrientes no Prato:
                </span>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <p className="text-[10px] uppercase font-bold text-slate-500">Proteína</p>
                    <p className="text-sm sm:text-base font-black text-slate-900 tabular-nums font-heading">140 g</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <p className="text-[10px] uppercase font-bold text-slate-500">Gordura</p>
                    <p className="text-sm sm:text-base font-black text-slate-900 tabular-nums font-heading">55 g</p>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <p className="text-[10px] uppercase font-bold text-slate-500">Carboidrato</p>
                    <p className="text-sm sm:text-base font-black text-slate-900 tabular-nums font-heading">146 g</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-slate-500 italic">
              *Exemplo do e-book. Seus números serão diferentes e personalizados para seu corpo.
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================================
          8) PARA QUEM É / PARA QUEM NÃO É
          ==================================================================== */}
      <section className="py-14 px-4 sm:px-6 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 text-center font-heading">
            Transparência: para quem é e para quem NÃO é
          </h2>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PARA QUEM É */}
            <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-700" />
                <h3 className="text-lg font-bold text-emerald-950 font-heading">
                  É PARA VOCÊ QUE:
                </h3>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-800">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>É iniciante e quer começar do jeito certo, sem passar fome</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>Quer treinar em casa com o peso do próprio corpo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>Quer entender o próprio corpo em vez de depender de terceiros</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>Quer economizar mensalidades caras de academia e consultorias</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>Já tentou de tudo na internet sem um método organizado</span>
                </li>
              </ul>
            </div>

            {/* PARA QUEM NÃO É */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="w-6 h-6 text-rose-600" />
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  NÃO É PARA QUEM:
                </h3>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span>Busca resultado mágico da noite para o dia sem nenhum esforço</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span>É menor de 18 anos ou está gestante / lactante</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span>Possui doenças clínicas ativas que exijam dieta específica individual</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span>Tem histórico de transtorno alimentar sem acompanhamento médico especializado</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          9) SEGURANÇA E RESPONSABILIDADE
          "Emagrecimento seguro vem primeiro"
          ==================================================================== */}
      <section className="py-12 px-4 sm:px-6 bg-emerald-900 text-white border-t border-emerald-800">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-12 h-12 bg-emerald-800/80 rounded-2xl flex items-center justify-center mx-auto mb-3 text-emerald-300 border border-emerald-700">
            <HeartPulse className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-heading">
            Emagrecimento seguro vem primeiro
          </h2>
          <p className="mt-3 text-sm sm:text-base text-emerald-100 leading-relaxed">
            Todos os guias trazem metas seguras de perda por semana, trava de calorias mínimas, sinais de alerta
            para parar e procurar ajuda profissional e ensinam a ajustar o plano sem passar fome.
          </p>
        </div>
      </section>

      {/* ====================================================================
          10) OFERTA PRINCIPAL DE CONVERSÃO
          ==================================================================== */}
      <section
        id="oferta"
        className="py-16 px-4 sm:px-6 bg-gradient-to-b from-white via-emerald-50/60 to-slate-50 border-t border-slate-200"
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center max-w-xl mx-auto">
            <span className="bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Escolha Sua Opção
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 font-heading">
              Comece agora seu plano em números
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Acesso imediato no seu e-mail logo após a confirmação do pagamento.
            </p>
          </div>

          {/* CARD DESTACADO: SÉRIE COMPLETA (MAIS ESCOLHIDA) */}
          <div className="mt-10 bg-white rounded-3xl border-3 border-emerald-600 shadow-2xl p-6 sm:p-8 relative overflow-hidden">
            {/* Faixa Superior Mais Escolhida */}
            <div className="absolute top-0 right-0 left-0 bg-[#0e6033] text-white py-2 text-center text-xs font-black tracking-widest uppercase flex items-center justify-center gap-1.5 font-heading">
              <Award className="w-4 h-4 text-amber-300" />
              <span>SÉRIE COMPLETA · OFERTA RECOMENDADA (4 PARTES)</span>
            </div>

            <div className="pt-6 text-center">
              <span className="inline-block bg-amber-100 text-amber-900 text-xs font-extrabold px-3 py-1 rounded-full border border-amber-300 mb-2">
                ECONOMIA DE R$ 10,06 NO COMBO
              </span>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                SÉRIE COMPLETA · As 4 Partes
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Diagnóstico + Dieta + Prato & Treino em Casa + Ajuste de 12 Semanas
              </p>

              {/* Preço */}
              <div className="mt-5 flex items-baseline justify-center gap-2">
                <span className="text-sm sm:text-base text-slate-400 line-through">
                  de R$ {CONFIG.PRECO_DE}
                </span>
                <span className="text-xs text-slate-500 font-semibold">por apenas</span>
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0e6033] tabular-nums font-heading">
                  R$ {CONFIG.PRECO_COMBO}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Pagamento único · Sem mensalidades recorrentes
              </p>

              {/* Checklist do Combo */}
              <div className="mt-6 text-left bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80 space-y-2.5 text-xs sm:text-sm">
                <div className="flex items-start gap-2.5 font-medium text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Parte 1:</strong> Seu Diagnóstico Corporal (IMC, fita métrica, % de gordura)</span>
                </div>
                <div className="flex items-start gap-2.5 font-medium text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Parte 2:</strong> Sua Dieta em Números (TMB, gasto diário, macros e trava segura)</span>
                </div>
                <div className="flex items-start gap-2.5 font-medium text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Parte 3:</strong> Prato Brasileiro e Treinos A/B/C sem academia</span>
                </div>
                <div className="flex items-start gap-2.5 font-medium text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Parte 4:</strong> Ajuste a cada 2 semanas e plano de 12 semanas anti-platô</span>
                </div>
                <div className="flex items-start gap-2.5 font-medium text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Bônus inclusos:</strong> Fichas para preencher, tabela pronta e cola de fórmulas</span>
                </div>
              </div>

              {/* Botão de Compra Combo */}
              <div className="mt-6">
                <button
                  onClick={() =>
                    handleBuyClick('Série Completa Emagrecimento em Números', CONFIG.PRECO_COMBO, CONFIG.LINK_CHECKOUT_COMBO)
                  }
                  className="w-full py-4 px-6 bg-[#f97316] hover:bg-[#ea580c] active:bg-[#c2410c] text-white font-black text-lg sm:text-xl rounded-xl shadow-xl animate-cta-pulse transition-all flex items-center justify-center gap-2 cursor-pointer font-heading"
                >
                  <Lock className="w-5 h-5" />
                  <span>QUERO A SÉRIE COMPLETA (R$ {CONFIG.PRECO_COMBO})</span>
                </button>
              </div>

              {/* Selos de Segurança e Formas de Pagamento */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-emerald-600" /> PIX (acesso em 1 minuto)
                </span>
                <span className="flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 text-emerald-600" /> Cartão de Crédito
                </span>
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" /> Pagamento 100% Seguro
                </span>
              </div>
            </div>
          </div>

          {/* OPÇÃO SECUNDÁRIA: PARTES AVULSAS */}
          <div className="mt-14">
            <h4 className="text-center font-bold text-slate-700 text-sm uppercase tracking-wider mb-6">
              Ou escolha comprar as partes avulsas (R$ {CONFIG.PRECO_AVULSO} cada):
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* PARTE 1 AVULSA */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    PARTE 1 DE 4
                  </span>
                  <h5 className="font-bold text-slate-900 text-sm mt-1 font-heading">
                    Seu Diagnóstico Corporal
                  </h5>
                  <p className="text-xs text-slate-500 mt-0.5">
                    IMC, % de gordura e fita métrica.
                  </p>
                  <p className="mt-3 font-black text-slate-900 text-base tabular-nums font-heading">
                    R$ {CONFIG.PRECO_AVULSO}
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleBuyClick('Parte 1 - Seu Diagnóstico Corporal', CONFIG.PRECO_AVULSO, CONFIG.LINK_CHECKOUT_P1)
                  }
                  className="mt-3 w-full py-2 px-3 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Comprar Parte 1 (R$ {CONFIG.PRECO_AVULSO})
                </button>
              </div>

              {/* PARTE 2 AVULSA */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    PARTE 2 DE 4
                  </span>
                  <h5 className="font-bold text-slate-900 text-sm mt-1 font-heading">
                    Sua Dieta em Números
                  </h5>
                  <p className="text-xs text-slate-500 mt-0.5">
                    TMB, calorias e macros exatos.
                  </p>
                  <p className="mt-3 font-black text-slate-900 text-base tabular-nums font-heading">
                    R$ {CONFIG.PRECO_AVULSO}
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleBuyClick('Parte 2 - Sua Dieta em Números', CONFIG.PRECO_AVULSO, CONFIG.LINK_CHECKOUT_P2)
                  }
                  className="mt-3 w-full py-2 px-3 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Comprar Parte 2 (R$ {CONFIG.PRECO_AVULSO})
                </button>
              </div>

              {/* PARTE 3 AVULSA */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    PARTE 3 DE 4
                  </span>
                  <h5 className="font-bold text-slate-900 text-sm mt-1 font-heading">
                    Seu Prato e Seu Treino em Casa
                  </h5>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Alimentos brasileiros e treinos A/B/C.
                  </p>
                  <p className="mt-3 font-black text-slate-900 text-base tabular-nums font-heading">
                    R$ {CONFIG.PRECO_AVULSO}
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleBuyClick('Parte 3 - Seu Prato e Seu Treino', CONFIG.PRECO_AVULSO, CONFIG.LINK_CHECKOUT_P3)
                  }
                  className="mt-3 w-full py-2 px-3 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Comprar Parte 3 (R$ {CONFIG.PRECO_AVULSO})
                </button>
              </div>

              {/* PARTE 4 AVULSA */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    PARTE 4 DE 4
                  </span>
                  <h5 className="font-bold text-slate-900 text-sm mt-1 font-heading">
                    Acompanhe, Ajuste e Conquiste
                  </h5>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Regra quinzenal e tabela de 12 semanas.
                  </p>
                  <p className="mt-3 font-black text-slate-900 text-base tabular-nums font-heading">
                    R$ {CONFIG.PRECO_AVULSO}
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleBuyClick('Parte 4 - Acompanhe, Ajuste e Conquiste', CONFIG.PRECO_AVULSO, CONFIG.LINK_CHECKOUT_P4)
                  }
                  className="mt-3 w-full py-2 px-3 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Comprar Parte 4 (R$ {CONFIG.PRECO_AVULSO})
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          11) GARANTIA INCONDICIONAL DE 7 DIAS
          ==================================================================== */}
      <section className="py-12 px-4 sm:px-6 bg-white border-t border-slate-200">
        <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-5 p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200 text-center sm:text-left">
          <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-300 text-emerald-800 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 font-heading">
              Garantia Incondicional de 7 Dias
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-700 leading-relaxed">
              Você tem 7 dias para conferir o material. Se não gostar, pode pedir o reembolso, sem burocracia.
              Seu risco é zero, garantido pelo Código de Defesa do Consumidor.
            </p>
          </div>
        </div>
      </section>

      {/* ====================================================================
          12) DEPOIMENTOS
          (Governada pela flag CONFIG.MOSTRAR_DEPOIMENTOS = false)
          ==================================================================== */}
      {CONFIG.MOSTRAR_DEPOIMENTOS && (
        <section className="py-14 px-4 sm:px-6 bg-slate-50 border-t border-slate-200">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-black text-slate-900 font-heading">
              Depoimentos de quem usou o método
            </h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              {[1, 2, 3].map((num) => (
                <div key={num} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-xs text-slate-500 font-bold">
                      FOTO
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">[SUBSTITUIR POR NOME {num}]</p>
                      <p className="text-[10px] text-slate-500">[SUBSTITUIR POR CIDADE]</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 italic">
                    "[SUBSTITUIR POR DEPOIMENTO REAL DO ALUNO/LEITOR]"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ====================================================================
          13) PERGUNTAS FREQUENTES (ACCORDION)
          ==================================================================== */}
      <section className="py-14 px-4 sm:px-6 bg-white border-t border-slate-200">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-widest">
              Dúvidas Comuns
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-black text-slate-900 font-heading">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50 transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left font-bold text-sm sm:text-base text-slate-900 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-100/70 font-heading"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-emerald-700' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200/60 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          14) CTA FINAL
          ==================================================================== */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-emerald-900 to-slate-950 text-white text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading leading-tight">
            Daqui a 12 semanas você vai estar de qualquer jeito.{' '}
            <span className="text-[#facc15] block mt-1">A diferença é chegar com um plano.</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-emerald-100">
            Comece hoje por menos que um lanche.
          </p>

          <div className="mt-8">
            <button
              onClick={scrollToOffer}
              className="w-full sm:w-auto py-4 px-8 bg-[#f97316] hover:bg-[#ea580c] active:bg-[#c2410c] text-white font-black text-lg sm:text-xl rounded-xl shadow-2xl transition-all cursor-pointer inline-flex items-center justify-center gap-2 font-heading"
            >
              <span>QUERO COMEÇAR AGORA</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ====================================================================
          15) RODAPÉ COM AVISO LEGAL & COMPLIANCE
          ==================================================================== */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-4 sm:px-6 border-t border-slate-800 text-xs leading-relaxed">
        <div className="max-w-3xl mx-auto space-y-6 text-center">
          {/* Aviso Legal Obrigatório */}
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 text-[11px] sm:text-xs text-slate-300">
            <p className="font-semibold text-slate-200 mb-1">Aviso de Responsabilidade e Saúde:</p>
            <p>
              Este material é educativo e não substitui orientação médica, nutricional ou de educação física.
              Os resultados variam de pessoa para pessoa. Os cálculos apresentados são estimativas baseadas em fórmulas
              científicas da literatura internacional.
            </p>
          </div>

          {/* Links Institucionais e LGPD */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-300">
            <button
              onClick={() => setLegalModal('termos')}
              className="hover:text-emerald-400 underline underline-offset-2 cursor-pointer"
            >
              Termos de Uso
            </button>
            <span>·</span>
            <button
              onClick={() => setLegalModal('privacidade')}
              className="hover:text-emerald-400 underline underline-offset-2 cursor-pointer"
            >
              Política de Privacidade (LGPD)
            </button>
            <span>·</span>
            <button
              onClick={() => setLegalModal('contato')}
              className="hover:text-emerald-400 underline underline-offset-2 cursor-pointer"
            >
              Contato & Suporte
            </button>
          </div>

          {/* Dados Fiscais e Copyright */}
          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800 space-y-1">
            <p>
              {CONFIG.NOME_EMPRESA_OU_AUTOR} · CNPJ/CPF: {CONFIG.CNPJ_OU_CPF}
            </p>
            <p>
              {CONFIG.CIDADE_ESTADO} · E-mail: {CONFIG.EMAIL_SUPORTE}
            </p>
            <p className="text-slate-600">
              © {new Date().getFullYear()} Emagrecimento em Números. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* ====================================================================
          BARRA FIXA DE COMPRA NO RODAPÉ DO CELULAR
          Aparece após rolar a primeira dobra. Cumpre a regra de <15% da tela.
          ==================================================================== */}
      {showStickyBar && (
        <aside
          aria-label="Barra de compra rápida"
          className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2.5 shadow-[0_-4px_16px_rgba(0,0,0,0.12)] animate-in slide-in-from-bottom-2 duration-200"
          style={{ maxHeight: '14vh' }}
        >
          <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
            <div className="text-left shrink-0">
              <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-tight">
                Série Completa
              </span>
              <span className="text-base font-black text-[#0e6033] tabular-nums font-heading leading-tight">
                R$ {CONFIG.PRECO_COMBO}
              </span>
            </div>

            <button
              onClick={() =>
                handleBuyClick('Série Completa (Barra Fixa)', CONFIG.PRECO_COMBO, CONFIG.LINK_CHECKOUT_COMBO)
              }
              className="flex-1 py-2.5 px-3 bg-[#f97316] hover:bg-[#ea580c] active:bg-[#c2410c] text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer font-heading"
            >
              <span>Quero a série completa por R$ {CONFIG.PRECO_COMBO}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
      )}

      {/* ====================================================================
          BOTÃO FLUTUANTE DE WHATSAPP PARA SUPORTE
          ==================================================================== */}
      {CONFIG.NUMERO_WHATSAPP && (
        <a
          href={`https://wa.me/${CONFIG.NUMERO_WHATSAPP}?text=${encodeURIComponent(CONFIG.MENSAGEM_WHATSAPP)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar com suporte no WhatsApp"
          className="fixed bottom-16 md:bottom-6 right-4 z-40 bg-[#25D366] hover:bg-[#20ba59] text-white p-3 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
        >
          <MessageCircle className="w-6 h-6 fill-white" />
        </a>
      )}

      {/* ====================================================================
          MODAIS LEGAIS: Termos de Uso, Política de Privacidade e Contato
          ==================================================================== */}
      {legalModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setLegalModal(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLegalModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {legalModal === 'termos' && (
              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <h3 className="text-lg font-black text-slate-900 font-heading">
                  Termos de Uso
                </h3>
                <p>
                  Bem-vindo à página oficial de "Emagrecimento em Números". Ao adquirir ou utilizar este material
                  digital (e-books em formato PDF), você concorda com os termos aqui dispostos.
                </p>
                <p className="font-semibold text-slate-900">1. Natureza do Conteúdo</p>
                <p>
                  O conteúdo desta série é estritamente informativo e educativo. Ele ensina fórmulas matemáticas
                  públicas e consagradas para cálculo aproximado de gasto calórico, macronutrientes e propostas de
                  exercícios com o peso corporal. Ele NÃO constitui prescrição médica, diagnóstico clínico ou
                  acompanhamento nutricional individualizado.
                </p>
                <p className="font-semibold text-slate-900">2. Propriedade Intelectual</p>
                <p>
                  Todos os textos, tabelas, ilustrações e materiais complementares são de propriedade exclusiva do
                  autor e protegidos pela Lei de Direitos Autorais (Lei nº 9.610/98). É expressamente proibida a
                  reprodução, revenda, rateio ou distribuição pública sem autorização prévia por escrito.
                </p>
                <p className="font-semibold text-slate-900">3. Garantia de 7 Dias</p>
                <p>
                  Nos termos do art. 49 do Código de Defesa do Consumidor, o comprador tem até 7 (sete) dias corridos
                  a contar da confirmação da compra para solicitar o cancelamento e reembolso integral do valor pago.
                </p>
              </div>
            )}

            {legalModal === 'privacidade' && (
              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <h3 className="text-lg font-black text-slate-900 font-heading">
                  Política de Privacidade (LGPD)
                </h3>
                <p>
                  Esta política esclarece como tratamos os seus dados pessoais, em estrita conformidade com a Lei
                  Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD).
                </p>
                <p className="font-semibold text-slate-900">1. Dados da Calculadora</p>
                <p>
                  Os dados inseridos na calculadora interativa (idade, sexo, peso e altura) são processados
                  localmente no navegador do seu dispositivo e NÃO são armazenados em nossos servidores.
                </p>
                <p className="font-semibold text-slate-900">2. Dados de Compra</p>
                <p>
                  As transações financeiras e dados de pagamento (cartão, PIX, endereço) são processados diretamente
                  pela plataforma de pagamentos parceira (Hotmart/Kiwify), que conta com certificação de segurança
                  bancária PCI-DSS. Nós não armazenamos dados de cartões de crédito.
                </p>
                <p className="font-semibold text-slate-900">3. Cookies e Rastreamento</p>
                <p>
                  Utilizamos cookies analíticos e de conversão anônimos para mensurar o desempenho de tráfego orgânico
                  e campanhas publicitárias.
                </p>
              </div>
            )}

            {legalModal === 'contato' && (
              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <h3 className="text-lg font-black text-slate-900 font-heading">
                  Contato e Suporte ao Aluno
                </h3>
                <p>
                  Tem alguma dúvida sobre sua compra, entrega do material em PDF ou precisa de suporte? Entre em
                  contato conosco pelos canais oficiais:
                </p>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 mt-2">
                  <p>
                    <strong>E-mail:</strong>{' '}
                    <a href={`mailto:${CONFIG.EMAIL_SUPORTE}`} className="text-emerald-700 underline">
                      {CONFIG.EMAIL_SUPORTE}
                    </a>
                  </p>
                  {CONFIG.NUMERO_WHATSAPP && (
                    <p>
                      <strong>WhatsApp:</strong>{' '}
                      <a
                        href={`https://wa.me/${CONFIG.NUMERO_WHATSAPP}?text=${encodeURIComponent(
                          CONFIG.MENSAGEM_WHATSAPP
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-700 underline"
                      >
                        +{CONFIG.NUMERO_WHATSAPP}
                      </a>
                    </p>
                  )}
                  <p>
                    <strong>Horário de Atendimento:</strong> Segunda a sexta, das 9h às 18h (horário de Brasília).
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-200 text-right">
              <button
                onClick={() => setLegalModal(null)}
                className="py-2 px-4 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
