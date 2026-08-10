/**
 * Use this component if you need a block of text for a Storybook story or test.
 */

interface DeFinibusProps {
  long?: boolean
  extraLong?: boolean
}

const DeFinibus = ({ long, extraLong }: DeFinibusProps) => (
  <>
    <p style={{ marginTop: 0 }}>
      Non eram nescius, Brute, cum quae summis ingeniis exquisitaque doctrina
      philosophi Graeco sermone tractivissent ea Latinis litteris mandaremus,
      fore ut hic noster labor in varias reprehensiones incurreret. Nam
      quibusdam, et iis quidem non admodum indoctis, totum hoc disciplet
      philosophari. Quidam autem non tam id reprehendunt si remissius agatur,
      sed tantum studium tamque multam operam ponendam in eo non arbitrantur.
      Erunt etiam, et hi quidem eruditi Graecis litteris, contemnentes Latinas,
      qui se dicant in Graecis legendis operam malle consumere.
    </p>
    {(long || extraLong) && (
      <>
        <p>
          Postremo aliquos futuros suspicor qui me ad alias litteras vocent,
          genus hoc scribendi, etsi sit elegans, personae tamen et dignitatis
          esse negent. Contra quos omnes dicendum breviter existimo. Quamquam
          philosophiae quidem vituperatoribus satis resonsum est eo libro quo a
          nobis philosophia defensa et collaudata est cum esset accusata et
          vituperata ab Hortensio. Qui liber cum et tibi probatus videretur et
          iis quos ego posse iudicare arbitrarer, plura suscepi, veritus ne
          movere hominum studia viderer, retinere non posse.
        </p>
        <p>
          Qui autem, si maximae hoc placeat, moderatius tamen id volunt fieri,
          difficilem quandam temperantiam postulant in eo quod semel admissum
          coercieri reprimque non potest, ut propomodum iustioribus utamur illis
          qui omnino avocent a philosophia, quam his rebus infinitis modum
          constituant in reque eo meliore quo maior sit mediocritatem
          desiderent. Sive enim ad sapientiam preveniri potest, non paranda
          nobis solum ea sed fruenda etiam est; sive hoc difficile est, tamen
          nec modus est ullus investigandi veri nisi inveneris, et quaerendi
          defetigatio turpis est cum id quod quaeritur sit pulcherrimum. Etenim
          si delectamur cum scribimus, quis est tam individus qui ab eo nos
          abducat? Sin laburamus, quis est qui alienae modum statuat industriae?
          Nam ut Terentianus Chremes non inhumanus, qui novum vicinum non vult.
        </p>
      </>
    )}
    {extraLong && (
      <>
        <p>
          Fodere aut arare aut aliquid ferre denique--(non enim illum ab
          industria sed ab illiberali labore deterret), sic isti curiosi, quos
          offendit noster minime nobis iniucundus labor.
        </p>
        <p>
          Iis igitur est difficilisus satisfacere qui se Latina scripta dicunt
          contemnere. In quibus hoc primum est in quo admirer, cur in
          gravissimis rebus non delectet eos sermo patrius, cum iidem fabellas
          Latinas ad verbum e Graecis expressas non inviti legant. Quis enim tam
          inimicus paene nomini Romano est, qui Enni Mediam aut Antiopam Pacuvi
          spernat aut reiciat quod se iisdem Euripidi fabulis delectari dicat,
          Latinas litteras oderit? Synephebos ego, inquit, potius Caecili auth
          Andriam Terenti quam utramque Menandri legam?
        </p>
        <p>
          A quibus tantum dissentio ut, cum Sophocles vel optime scripserit
          Electram, tamen male conversam Atili mihi legendam putem, de quo
          Licinius "ferreum scriptorem," verum opinor scriptorem tamen, ut
          legendus sit. Rudem enim esse omnino in nostris poetis aut
          inertissimae segnitiae est aut fastidi delicatissimi. Mihi quidem
          nulli satis eruditi videntur quibus nostra ignota sunt. An Utinam ne
          in nemore--
        </p>
        <p>
          nihilo minus legimus quam hoc idem Graecum, quae autem de bene
          beateque vivendo a Platone disputata sunt, haec explicari non placebit
          Latine? Quid si nos non interpretum fungimur munere, sed tuemer ea
          quae dicta sunt ab iis quos probamus, eisque nostrum iudicium et
          nostrum scribendi ordinem adiungimus? quid habent cur Graeca
          anteponant iis quae et splendide dicta sing neque sint conversa de
          Graecis? Nam si dicent ab illis has res esse tractatas, ne ipsos
          quidem Graecos est cur tam multos legant quam legendi sunt. Quid enim
          est a Chrysippo praetermissum in Stoicis? Legimus tamen Diogenem,
          Antipatrum, Mnesarchum, Panaetium, multos alios, in primisque
          familiarem nostrum Posidonium. Quid? Theophrastus mediocriterne
          delectat cum tractat locos ab Aristotele ante tractatos? Quid?
          Epicurei num desistunt de iisdem, de quibus et ab Epicuro scriptum est
          et ab antiquis, ad arbitrium suum scribere? Quodsi Graeci leguntur a
          Graecis, iisdem de rebus alia ratione compositis, quid est cur nostri
          a nostris non legantur?
        </p>
        <p>
          Quamquam si plane sic verterem Platonem aut Aristotelem ut verterunt
          nostri poetae fabulas, male, credo, mererer de meis civibus si ad
          eorum cognitionem divina illa ingenia transferrem. Sed id neque feci
          adhuc nec mihi tamen ne faciam interdictum puto. Locos quidem quosdam,
          si videbitur, transferam, et maxime ab iis quos modo nominavi, cum
          inciderit ut id apte fieri possit; ut ab Homero Ennius, Afranius a
          Menandro solet. Nec vero, ut noster Lucilius, recusabo quo minus omnes
          mea legant. Utinam esset ille Persius! Scipio vero et Rutilius multo
          etiam magis; quorum ille iudicium reformidans Tarentinis ait se et
          Consentinis et Siculis scribere.
        </p>
        <p style={{ marginBottom: 0 }}>
          Facete is quidem, sicut alia; sed neque tam docti tum erant ad quorum
          iudicium elaboraret, et sunt illius scripta leviora, ut urbanitas
          summa appareat, doctrina mediocris. Ego autem quem timeam lectorem,
          cum ad te, ne Graecis quidem cedentem in philosophia, audeam scribere?
          Quamquam a te ipso id quidem facio provocatus gratissimo mihi libro
          quem ad me de virtute misisti. Sed ex eo credo quibusdam usu venire ut
          aborreant a Latinis, quod inciderint in inculta quaedam et horrida, de
          malis Graecis Latine scripta deterius. Quibus ego assentior, dum modo
          de iisdem rebus ne Graecos quidem legendos putent. Res vero bonas
          verbis electis graviter ornateque dictas quis non legat? Nisi qui se
          plane Graecum dici velit, ut a Scaevola est praetore salutatus Athenis
          Albucius. Quem quidem locum cum multa venustate et omni sale idem
          Lucilius, apud quem praeclare Scaevola...
        </p>
      </>
    )}
  </>
)

export default DeFinibus
