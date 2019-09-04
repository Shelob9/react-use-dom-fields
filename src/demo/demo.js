import React from 'react';
import { render } from 'react-dom';

import Demo from '../Demo';

/**
 * Render demo component
 */
const rootElement = document.getElementById('root');
render(<Demo />, rootElement);
