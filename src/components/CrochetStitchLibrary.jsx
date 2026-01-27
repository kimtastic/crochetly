import React, { useState } from 'react';
import { Search, Home, Play, BookOpen, Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';

// Mock Router implementation since we can't use React Router in artifacts
const useRouter = () => {
  const [currentRoute, setCurrentRoute] = useState('/');
  
  const navigate = (path) => setCurrentRoute(path);
  
  return { currentRoute, navigate };
};

// Stitch data with comprehensive information
const stitchLibrary = {
  'single-crochet': {
    id: 'single-crochet',
    name: 'Single Crochet (SC)',
    difficulty: 'Beginner',
    category: 'Basic',
    description: 'The foundation of crochet - a simple, sturdy stitch perfect for beginners.',
    instructions: [
      'Insert hook into the next stitch',
      'Yarn over and pull through (2 loops on hook)',
      'Yarn over and pull through both loops (1 loop remains)',
      'Repeat for each stitch across'
    ],
    videoUrl: 'https://www.youtube.com/embed/aAxGTnVNIUw',
    tips: [
      'Keep tension consistent for even stitches',
      'Count your stitches at the end of each row',
      'The turning chain does not count as a stitch'
    ],
    variations: [
      'Single crochet in back loop only (creates ridged texture)',
      'Single crochet in front loop only (creates raised edge)',
      'Extended single crochet (adds height with extra yarn over)'
    ],
    diagram: '🔗→🔗→🔗'
  },
  'double-crochet': {
    id: 'double-crochet',
    name: 'Double Crochet (DC)',
    difficulty: 'Beginner',
    category: 'Basic',
    description: 'A taller stitch that works up quickly and creates an open, airy fabric.',
    instructions: [
      'Yarn over, insert hook into next stitch',
      'Yarn over and pull through (3 loops on hook)',
      'Yarn over, pull through 2 loops (2 loops remain)',
      'Yarn over, pull through last 2 loops'
    ],
    videoUrl: 'https://www.youtube.com/embed/M5mNfttPMYI',
    tips: [
      'Chain 3 at the beginning counts as first double crochet',
      'Work into the top of the chain-3 when coming back',
      'Perfect for blankets and scarves'
    ],
    variations: [
      'Front post double crochet (FPDC)',
      'Back post double crochet (BPDC)',
      'Double crochet cluster'
    ],
    diagram: '🔗↗️🔗↗️🔗'
  },
  'half-double-crochet': {
    id: 'half-double-crochet',
    name: 'Half Double Crochet (HDC)',
    difficulty: 'Beginner',
    category: 'Basic',
    description: 'A medium-height stitch that bridges single and double crochet.',
    instructions: [
      'Yarn over, insert hook into next stitch',
      'Yarn over and pull through (3 loops on hook)',
      'Yarn over and pull through all 3 loops at once'
    ],
    videoUrl: 'https://www.youtube.com/embed/5v6F8INS-eU',
    tips: [
      'Chain 2 to turn (usually doesn\'t count as stitch)',
      'Creates a dense but flexible fabric',
      'Great for hats and fitted garments'
    ],
    variations: [
      'Standing half double crochet',
      'Half double crochet in third loop',
      'Linked half double crochet'
    ],
    diagram: '🔗↗️🔗'
  },
  'treble-crochet': {
    id: 'treble-crochet',
    name: 'Treble Crochet (TR)',
    difficulty: 'Intermediate',
    category: 'Basic',
    description: 'A tall stitch perfect for creating height and open lacework.',
    instructions: [
      'Yarn over twice, insert hook into next stitch',
      'Yarn over and pull through (4 loops on hook)',
      'Yarn over, pull through 2 loops (3 loops remain)',
      'Yarn over, pull through 2 loops (2 loops remain)',
      'Yarn over, pull through last 2 loops'
    ],
    videoUrl: 'https://www.youtube.com/embed/ClGF2D5N9Gg',
    tips: [
      'Chain 4 to turn counts as first treble',
      'Excellent for shawls and decorative edges',
      'Keep yarn overs loose to prevent tight stitches'
    ],
    variations: [
      'Double treble crochet (DTR)',
      'Triple treble crochet (TRTR)',
      'Treble crochet cluster'
    ],
    diagram: '🔗↗️↗️🔗'
  },
  'slip-stitch': {
    id: 'slip-stitch',
    name: 'Slip Stitch (SL ST)',
    difficulty: 'Beginner',
    category: 'Basic',
    description: 'The shortest stitch, used for joining and creating smooth edges.',
    instructions: [
      'Insert hook into next stitch',
      'Yarn over and pull through both the stitch and loop on hook in one motion'
    ],
    videoUrl: 'https://www.youtube.com/embed/hyWnGFI41pY',
    tips: [
      'Creates almost no height',
      'Perfect for joining rounds',
      'Don\'t pull too tight'
    ],
    variations: [
      'Surface slip stitch (decorative)',
      'Reverse slip stitch',
      'Slip stitch seaming'
    ],
    diagram: '🔗—🔗—🔗'
  },
  'shell-stitch': {
    id: 'shell-stitch',
    name: 'Shell Stitch',
    difficulty: 'Intermediate',
    category: 'Decorative',
    description: 'Multiple stitches worked into the same space creating a fan or shell shape.',
    instructions: [
      'Skip 2 stitches, work 5 double crochet in next stitch',
      'Skip 2 stitches, single crochet in next stitch',
      'Repeat across row',
      'Chain 3, turn'
    ],
    videoUrl: 'https://www.youtube.com/embed/1_BAtWsYGoo',
    tips: [
      'Count carefully to maintain pattern',
      'Block finished pieces for best shell definition',
      'Great for blanket borders'
    ],
    variations: [
      'Small shell (3 DC)',
      'Large shell (7 DC)',
      'Picot shell stitch'
    ],
    diagram: '🌟⭐🌟'
  },
  'granny-square': {
    id: 'granny-square',
    name: 'Granny Square',
    difficulty: 'Intermediate',
    category: 'Motifs',
    description: 'The classic crochet motif worked in rounds with chain spaces.',
    instructions: [
      'Round 1: Magic ring, ch 3, 2 dc, ch 2, *3 dc, ch 2* 3 times, join',
      'Round 2: Sl st to corner space, ch 3, 2 dc, ch 2, 3 dc in same space',
      'Ch 1, *3 dc, ch 2, 3 dc in corner, ch 1* repeat around',
      'Continue adding rounds as desired'
    ],
    videoUrl: 'https://www.youtube.com/embed/ChPVdZMnIpo',
    tips: [
      'Keep corner chain-2 spaces consistent',
      'Change colors each round for traditional look',
      'Block squares before joining'
    ],
    variations: [
      'Solid granny square',
      'Flower granny square',
      'African flower square'
    ],
    diagram: '⬜🌸⬜'
  },
  'moss-stitch': {
    id: 'moss-stitch',
    name: 'Moss Stitch (Linen Stitch)',
    difficulty: 'Intermediate',
    category: 'Textured',
    description: 'Alternating single crochet and chain spaces create a woven texture.',
    instructions: [
      'Row 1: *Sc, ch 1, skip next st* repeat across',
      'Row 2: *Sc in ch-1 space, ch 1* repeat across',
      'Repeat Row 2 for pattern'
    ],
    videoUrl: 'https://www.youtube.com/embed/jJ8K3nHhEHQ',
    tips: [
      'Use same size hook as yarn weight recommendation',
      'Creates a stable, non-curling fabric',
      'Perfect for dishcloths and bags'
    ],
    variations: [
      'Extended moss stitch',
      'Moss stitch in the round',
      'Two-color moss stitch'
    ],
    diagram: '⬜▫️⬜▫️⬜'
  },
  'bobble-stitch': {
    id: 'bobble-stitch',
    name: 'Bobble Stitch',
    difficulty: 'Advanced',
    category: 'Textured',
    description: 'Multiple incomplete double crochets worked together create raised bobbles.',
    instructions: [
      'Yarn over, insert hook, yo, pull through, yo, pull through 2 loops',
      'Repeat step 1 four more times in same stitch (6 loops on hook)',
      'Yarn over and pull through all 6 loops',
      'Chain 1 to secure bobble'
    ],
    videoUrl: 'https://www.youtube.com/embed/NqJmUNAtLp8',
    tips: [
      'Push bobbles to front of work',
      'Space bobbles evenly for best effect',
      'Use contrasting colors for dramatic bobbles'
    ],
    variations: [
      'Popcorn stitch (completed dc\'s)',
      'Puff stitch (half dc)',
      'Cluster stitch'
    ],
    diagram: '●○●○●'
  },

  'back-loop-only': {
    id: 'back-loop-only',
    name: 'Back Loop Only (BLO)',
    difficulty: 'Beginner',
    category: 'Basic',
    description: 'Working stitches only through the back loop creates horizontal ridges perfect for ribbing.',
    instructions: [
      'Insert hook only through the back loop of the stitch',
      'Complete the stitch as usual (sc, hdc, dc, etc.)',
      'Repeat across the row',
      'Turn and work through back loops again'
    ],
    videoUrl: 'https://www.youtube.com/embed/placeholder',
    tips: [
      'Creates pronounced horizontal ridges',
      'Excellent for sweater cuffs and hems',
      'Works well with any basic stitch'
    ],
    variations: [
      'Front loop only (FLO)',
      'Third loop only (for half double crochet)',
      'Alternating BLO/FLO patterns'
    ],
    diagram: '══════'
  },
  'double-treble-crochet': {
    id: 'double-treble-crochet',
    name: 'Double Treble Crochet (DTR)',
    difficulty: 'Intermediate',
    category: 'Basic',
    description: 'An extra tall stitch that creates open, lacy fabric perfect for shawls and decorative work.',
    instructions: [
      'Yarn over three times, insert hook into next stitch',
      'Yarn over and pull through (5 loops on hook)',
      'Yarn over, pull through 2 loops (4 loops remain)',
      'Yarn over, pull through 2 loops (3 loops remain)',
      'Yarn over, pull through 2 loops (2 loops remain)',
      'Yarn over, pull through last 2 loops'
    ],
    videoUrl: 'https://www.youtube.com/embed/placeholder',
    tips: [
      'Chain 5 to turn counts as first DTR',
      'Keep yarn overs loose for even stitches',
      'Great for quick-growing projects'
    ],
    variations: [
      'Triple treble crochet',
      'Double treble cluster',
      'Linked double treble'
    ],
    diagram: '↗️↗️↗️🔗'
  },
  'front-post-double-crochet': {
    id: 'front-post-double-crochet',
    name: 'Front Post Double Crochet (FPDC)',
    difficulty: 'Intermediate',
    category: 'Textured',
    description: 'Working around the post of the stitch creates raised ridges perfect for cables and texture.',
    instructions: [
      'Yarn over, insert hook from front to back around post of next stitch',
      'Yarn over and pull through (3 loops on hook)',
      'Yarn over, pull through 2 loops (2 loops remain)',
      'Yarn over, pull through last 2 loops'
    ],
    videoUrl: 'https://www.youtube.com/embed/placeholder',
    tips: [
      'Creates pronounced forward-facing ridges',
      'Essential for crochet cables',
      'Keep tension consistent for even posts'
    ],
    variations: [
      'Front post treble crochet',
      'Front post half double crochet',
      'Alternating post stitches'
    ],
    diagram: '▓▓▓▓▓'
  },
  'back-post-double-crochet': {
    id: 'back-post-double-crochet',
    name: 'Back Post Double Crochet (BPDC)',
    difficulty: 'Intermediate',
    category: 'Textured',
    description: 'Working around the back of the post creates recessed ridges that complement FPDC.',
    instructions: [
      'Yarn over, insert hook from back to front around post of next stitch',
      'Yarn over and pull through (3 loops on hook)',
      'Yarn over, pull through 2 loops (2 loops remain)',
      'Yarn over, pull through last 2 loops'
    ],
    videoUrl: 'https://www.youtube.com/embed/placeholder',
    tips: [
      'Creates backward-facing ridges',
      'Often paired with FPDC for ribbing',
      'Great for basketweave patterns'
    ],
    variations: [
      'Back post treble crochet',
      'Back post half double crochet',
      'Post stitch combinations'
    ],
    diagram: '░░░░░'
  },
  'popcorn-stitch': {
    id: 'popcorn-stitch',
    name: 'Popcorn Stitch',
    difficulty: 'Intermediate',
    category: 'Textured',
    description: 'A puffy 3D stitch that pops out from the fabric for dramatic texture.',
    instructions: [
      'Work 5 double crochet in the same stitch',
      'Remove hook from working loop',
      'Insert hook from front to back through first DC',
      'Pick up dropped loop and pull through',
      'Chain 1 to secure the popcorn'
    ],
    videoUrl: 'https://www.youtube.com/embed/placeholder',
    tips: [
      'Use a hook one size smaller for tighter popcorns',
      'Block finished pieces to enhance 3D effect',
      'Great for pillows and afghans'
    ],
    variations: [
      'Mini popcorn (3 DC)',
      'Large popcorn (7 DC)',
      'Popcorn stitch cluster'
    ],
    diagram: '◉◉◉◉◉'
  },
  'cluster-stitch': {
    id: 'cluster-stitch',
    name: 'Cluster Stitch',
    difficulty: 'Intermediate',
    category: 'Textured',
    description: 'Multiple stitches worked together but finished as one for concentrated texture.',
    instructions: [
      'Yarn over, insert hook in stitch, draw up loop (3 loops on hook)',
      'Yarn over, pull through 2 loops (2 loops remain)',
      'Repeat 2 more times in same stitch (4 loops total)',
      'Yarn over, pull through all 4 loops'
    ],
    videoUrl: 'https://www.youtube.com/embed/placeholder',
    tips: [
      'Creates dense, textured fabric',
      'Great for bags and home decor',
      'Can be worked with different stitch heights'
    ],
    variations: [
      'DC cluster',
      'Treble cluster',
      'Multi-stitch cluster'
    ],
    diagram: '◆◆◆◆'
  },
  'v-stitch': {
    id: 'v-stitch',
    name: 'V-Stitch',
    difficulty: 'Beginner',
    category: 'Textured',
    description: 'Creates V-shaped openings that form a lacy, decorative pattern.',
    instructions: [
      'Double crochet, chain 1, double crochet all in the same stitch',
      'Skip next stitch',
      'Repeat across row'
    ],
    videoUrl: 'https://www.youtube.com/embed/placeholder',
    tips: [
      'Chain 3 at beginning counts as first DC + ch 1 space',
      'Creates lightweight, airy fabric',
      'Perfect for shawls and summer tops'
    ],
    variations: [
      'V-stitch with different stitches',
      'Double V-stitch',
      'V-stitch in rounds'
    ],
    diagram: '⩖⩖⩖'
  },
  'crossed-double-crochet': {
    id: 'crossed-double-crochet',
    name: 'Crossed Double Crochet',
    difficulty: 'Intermediate',
    category: 'Decorative',
    description: 'Criss-crossed stitches create an X pattern for elegant texture.',
    instructions: [
      'Skip one stitch, double crochet in next stitch',
      'Double crochet in the skipped stitch',
      'Repeat across row'
    ],
    videoUrl: 'https://www.youtube.com/embed/placeholder',
    tips: [
      'Creates woven-looking fabric',
      'Great for scarves and blankets',
      'Works well with variegated yarn'
    ],
    variations: [
      'Crossed half double crochet',
      'Double crossed stitches',
      'Crossed stitch cables'
    ],
    diagram: '✖️✖️✖️'
  },
  'broomstick-lace': {
    id: 'broomstick-lace',
    name: 'Broomstick Lace (Jiffy Lace)',
    difficulty: 'Advanced',
    category: 'Decorative',
    description: 'Creates large, lacy loops using a broomstick or knitting needle.',
    instructions: [
      'Work a row of loops: draw up loop in each stitch, place on broomstick',
      'Remove hook, pull groups of loops together',
      'Work stitches into grouped loops',
      'Repeat process for each row'
    ],
    videoUrl: 'https://www.youtube.com/embed/placeholder',
    tips: [
      'Use smooth knitting needle or actual broomstick',
      'Creates very light, airy fabric',
      'Perfect for shawls and wraps'
    ],
    variations: [
      'Different group sizes',
      'Broomstick lace in rounds',
      'Combination with other stitches'
    ],
    diagram: '◌◌◌◌'
  },
  'tunisian-simple-stitch': {
    id: 'tunisian-simple-stitch',
    name: 'Tunisian Simple Stitch (TSS)',
    difficulty: 'Intermediate',
    category: 'Specialty',
    description: 'A Tunisian crochet technique that creates a woven-like fabric.',
    instructions: [
      'Forward pass: insert hook, yarn over, pull up loop in each stitch',
      'Return pass: yarn over, pull through one loop',
      'Yarn over, pull through two loops repeatedly'
    ],
    videoUrl: 'https://www.youtube.com/embed/placeholder',
    tips: [
      'Requires special Tunisian hook',
      'Creates dense, woven fabric',
      'Does not curl as much as other Tunisian stitches'
    ],
    variations: [
      'Tunisian knit stitch',
      'Tunisian purl stitch',
      'Tunisian colorwork'
    ],
    diagram: '║║║║║'
  },
  'tunisian-knit-stitch': {
    id: 'tunisian-knit-stitch',
    name: 'Tunisian Knit Stitch (TKS)',
    difficulty: 'Intermediate',
    category: 'Specialty',
    description: 'Mimics knitting stitches using Tunisian crochet technique.',
    instructions: [
      'Forward pass: insert hook between vertical bars, yarn over, pull up loop',
      'Return pass: yarn over, pull through one loop',
      'Yarn over, pull through two loops repeatedly'
    ],
    videoUrl: 'https://www.youtube.com/embed/placeholder',
    tips: [
      'Creates knit-like V-pattern',
      'Great for blankets and garments',
      'Less dense than TSS'
    ],
    variations: [
      'Tunisian purl stitch',
      'Seed stitch combination',
      'Cable patterns'
    ],
    diagram: '▓▓▓▓▓'
  },
  'spike-stitch': {
    id: 'spike-stitch',
    name: 'Spike Stitch',
    difficulty: 'Intermediate',
    category: 'Decorative',
    description: 'Long stitches that reach down into previous rows for added texture.',
    instructions: [
      'Insert hook down 2-3 rows below current stitch',
      'Yarn over, pull up loop to current height',
      'Complete as regular single crochet',
      'Repeat across row'
    ],
    videoUrl: 'https://www.youtube.com/embed/placeholder',
    tips: [
      'Creates dramatic vertical lines',
      'Great for colorwork effects',
      'Use consistent depth for uniform look'
    ],
    variations: [
      'Different spike lengths',
      'Double spike stitch',
      'Spike stitch patterns'
    ],
    diagram: '↓↓↓↓↓'
  },
  'corner-to-corner-stitch': {
    id: 'corner-to-corner-stitch',
    name: 'Corner-to-Corner (C2C)',
    difficulty: 'Intermediate',
    category: 'Specialty',
    description: 'Works diagonally from corner to corner, perfect for graphghans.',
    instructions: [
      'Block 1: Chain 6, DC in 4th chain from hook and next 2 chains',
      'Increase row: Sl st to ch-3 space, ch 6, DC in 4th ch and next 2, *sl st to next ch-3 space, ch 3, 3 DC* repeat',
      'Decrease: Sl st across 3 DC, sl st to ch-3 space, ch 3, 3 DC'
    ],
    videoUrl: 'https://www.youtube.com/embed/placeholder',
    tips: [
      'Perfect for pixel art designs',
      'Creates sturdy, textured fabric',
      'Great for blankets and pillows'
    ],
    variations: [
      'C2C with other stitches',
      'C2C rectangles',
      'C2C color changes'
    ],
    diagram: '◢◣◢◣'
  },
  'crab-stitch': {
    id: 'crab-stitch',
    name: 'Crab Stitch (Reverse Single Crochet)',
    difficulty: 'Beginner',
    category: 'Decorative',
    description: 'Working single crochet in reverse creates a corded, decorative edge.',
    instructions: [
      'Insert hook from left to right into next stitch',
      'Yarn over and pull through (2 loops on hook)',
      'Yarn over and pull through both loops',
      'Work in opposite direction of normal crochet'
    ],
    videoUrl: 'https://www.youtube.com/embed/placeholder',
    tips: [
      'Excellent for edging blankets',
      'Creates sturdy, rounded edge',
      'Work loosely to prevent puckering'
    ],
    variations: [
      'Reverse half double crochet',
      'Crab stitch in rounds',
      'Crab stitch borders'
    ],
    diagram: '⋰⋰⋰⋰'
  },
  'solomons-knot': {
    id: 'solomons-knot',
    name: 'Solomon\'s Knot (Lover\'s Knot)',
    difficulty: 'Advanced',
    category: 'Decorative',
    description: 'Creates delicate, lace-like fabric using decorative knots.',
    instructions: [
      'Make single crochet',
      'Draw up loop to desired height (about 1/2 inch)',
      'Yarn over and pull through loop to secure',
      'Insert hook under knot, single crochet, repeat'
    ],
    videoUrl: 'https://www.youtube.com/embed/placeholder',
    tips: [
      'Creates very light, airy lace',
      'Perfect for shawls and summer tops',
      'Consistent knot size is key'
    ],
    variations: [
      'Different knot heights',
      'Solomon\'s knot in rounds',
      'Combination with filet crochet'
    ],
    diagram: '🪢🪢🪢'
  },
  'entrelac-crochet': {
    id: 'entrelac-crochet',
    name: 'Entrelac Crochet',
    difficulty: 'Advanced',
    category: 'Specialty',
    description: 'Creates interlocking squares of fabric for complex textured patterns.',
    instructions: [
      'Work base triangles',
      'Work rectangles to the right',
      'Work left-leaning rectangles',
      'Work top triangles to finish'
    ],
    videoUrl: 'https://www.youtube.com/embed/placeholder',
    tips: [
      'Creates woven basket pattern',
      'Great for colorwork effects',
      'Requires careful attention to square orientation'
    ],
    variations: [
      'Different rectangle sizes',
      'Entrelac in rounds',
      'Gradient color entrelac'
    ],
    diagram: '▦▦▦▦'
  },
  'filet-crochet': {
    id: 'filet-crochet',
    name: 'Filet Crochet (Mesh Stitch)',
    difficulty: 'Intermediate',
    category: 'Decorative',
    description: 'Creates grid-like lace patterns using blocks and spaces.',
    instructions: [
      'Block: 3 DC in same space',
      'Space: DC, ch 2, skip 2 stitches',
      'Follow chart or pattern for design',
      'Chain 3 at start counts as first DC'
    ],
    videoUrl: 'https://www.youtube.com/embed/placeholder',
    tips: [
      'Perfect for text and images',
      'Creates stable, flat fabric',
      'Use smooth yarn for best results'
    ],
    variations: [
      'Different mesh sizes',
      'Filet crochet in rounds',
      'Multicolor filet'
    ],
    diagram: '▦▦▦▦'
  },
  'overlay-crochet': {
    id: 'overlay-crochet',
    name: 'Overlay Crochet (Mosaic)',
    difficulty: 'Advanced',
    category: 'Specialty',
    description: 'Adds colorwork designs on top of base fabric for complex patterns.',
    instructions: [
      'Work base layer in main color',
      'Add overlay stitches in contrasting colors',
      'Work overlay stitches into previous rows',
      'Build up layers for depth'
    ],
    videoUrl: 'https://www.youtube.com/embed/placeholder',
    tips: [
      'Creates 3D textured designs',
      'Excellent for geometric patterns',
      'Requires careful tension control'
    ],
    variations: [
      'Single overlay layers',
      'Multiple overlay techniques',
      'Overlay mosaic patterns'
    ],
    diagram: '▓▓▓▓'
  }
};

const StitchCard = ({ stitch, onClick }) => (
  <div 
    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-pink-400"
    onClick={() => onClick(stitch.id)}
  >
    <div className="flex justify-between items-start mb-3">
      <h3 className="text-xl font-semibold text-gray-800">{stitch.name}</h3>
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        stitch.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
        stitch.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
        'bg-red-100 text-red-800'
      }`}>
        {stitch.difficulty}
      </span>
    </div>
    <p className="text-gray-600 mb-4">{stitch.description}</p>
    <div className="flex justify-between items-center">
      <span className="text-sm text-pink-600 font-medium">{stitch.category}</span>
      <div className="text-2xl">{stitch.diagram}</div>
    </div>
  </div>
);

const StitchDetail = ({ stitch, onBack }) => (
  <div className="max-w-4xl mx-auto">
    <div className="mb-6">
      <button 
        onClick={onBack}
        className="flex items-center text-pink-600 hover:text-pink-700 mb-4"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to Library
      </button>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">{stitch.name}</h1>
              <p className="text-pink-100 text-lg">{stitch.description}</p>
            </div>
            <div className="text-right">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                stitch.difficulty === 'Beginner' ? 'bg-green-500 text-white' :
                stitch.difficulty === 'Intermediate' ? 'bg-yellow-500 text-white' :
                'bg-red-500 text-white'
              }`}>
                {stitch.difficulty}
              </span>
              <div className="mt-2 text-pink-100">{stitch.category}</div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Instructions */}
            <div>
              <div className="flex items-center mb-4">
                <BookOpen className="w-6 h-6 text-pink-600 mr-2" />
                <h2 className="text-2xl font-semibold text-gray-800">Instructions</h2>
              </div>
              <ol className="space-y-3">
                {stitch.instructions.map((instruction, index) => (
                  <li key={index} className="flex">
                    <span className="bg-pink-100 text-pink-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 leading-relaxed">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Video Tutorial */}
            <div>
              <div className="flex items-center mb-4">
                <Play className="w-6 h-6 text-pink-600 mr-2" />
                <h2 className="text-2xl font-semibold text-gray-800">Video Tutorial</h2>
              </div>
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <iframe
                  src={stitch.videoUrl}
                  title={`${stitch.name} Tutorial`}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-8">
            <div className="flex items-center mb-4">
              <Lightbulb className="w-6 h-6 text-pink-600 mr-2" />
              <h2 className="text-2xl font-semibold text-gray-800">Tips & Tricks</h2>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <ul className="space-y-2">
                {stitch.tips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-600 mr-2">💡</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Variations */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Variations</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stitch.variations.map((variation, index) => (
                <div key={index} className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-400">
                  <span className="text-purple-800 font-medium">{variation}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const HomePage = ({ stitches, onStitchClick, searchTerm, onSearchChange }) => {
  const categories = [...new Set(Object.values(stitches).map(s => s.category))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredStitches = Object.values(stitches).filter(stitch => {
    const matchesSearch = stitch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stitch.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || stitch.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-12 mb-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Crochet Stitch Library</h1>
          <p className="text-xl text-pink-100">Master every stitch with video tutorials, tips, and variations</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search stitches..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="All">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="text-center p-4 bg-white rounded-lg shadow">
            <div className="text-2xl font-bold text-pink-600">{Object.keys(stitches).length}</div>
            <div className="text-gray-600">Total Stitches</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600">
              {Object.values(stitches).filter(s => s.difficulty === 'Beginner').length}
            </div>
            <div className="text-gray-600">Beginner</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow">
            <div className="text-2xl font-bold text-yellow-600">
              {Object.values(stitches).filter(s => s.difficulty === 'Intermediate').length}
            </div>
            <div className="text-gray-600">Intermediate</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow">
            <div className="text-2xl font-bold text-red-600">
              {Object.values(stitches).filter(s => s.difficulty === 'Advanced').length}
            </div>
            <div className="text-gray-600">Advanced</div>
          </div>
        </div>

        {/* Stitch Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStitches.map(stitch => (
            <StitchCard 
              key={stitch.id} 
              stitch={stitch} 
              onClick={onStitchClick}
            />
          ))}
        </div>

        {filteredStitches.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🧶</div>
            <p className="text-gray-600 text-lg">No stitches found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const CrochetStitchLibrary = () => {
  const { currentRoute, navigate } = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const currentStitch = currentRoute.startsWith('/stitch/') 
    ? stitchLibrary[currentRoute.replace('/stitch/', '')]
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center text-pink-600 hover:text-pink-700 font-semibold text-lg"
            >
              <Home className="w-6 h-6 mr-2" />
              Stitch Library
            </button>
            <div className="text-sm text-gray-600">
              {Object.keys(stitchLibrary).length} stitches available
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-6">
        {currentRoute === '/' ? (
          <HomePage 
            stitches={stitchLibrary}
            onStitchClick={(stitchId) => navigate(`/stitch/${stitchId}`)}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        ) : currentStitch ? (
          <div className="max-w-6xl mx-auto px-6">
            <StitchDetail 
              stitch={currentStitch}
              onBack={() => navigate('/')}
            />
          </div>
        ) : (
          <div className="max-w-6xl mx-auto px-6 text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Stitch Not Found</h2>
            <button 
              onClick={() => navigate('/')}
              className="text-pink-600 hover:text-pink-700"
            >
              Return to Library
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="mb-2">Happy Crocheting!</p>
          <p className="text-gray-400 text-sm">
            Your comprehensive guide to mastering crochet stitches
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CrochetStitchLibrary;